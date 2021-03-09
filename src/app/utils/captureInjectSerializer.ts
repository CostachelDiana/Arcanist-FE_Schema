import { CaptureInjectionSettings } from './captureInfoComponents'
import { CaptureInjectInfo } from './captureInfoComponents'

export class CaptureInjectSerializer {

  public serializeCaptureInject(captureId: string, captureSetId: string, sett: CaptureInjectionSettings[], cap: CaptureInjectInfo[]): string {

    var jsObj = {
      "captureId": captureId,
      "captureSetId": captureSetId
    };

    var workersInjectParams = [];
    for (var i = 0; i < sett.length; i++) {
      var injectSettings = {
        "PlayByPacketTime": true,
        "PlayLoopCount": 1,
        "PlayLoopDelay": 0,
        "PlayDeltaStart": 0,
        "PlayDeltaEnd": cap[i].captureLength,
      }
      var mappings = [];
      var CD = {
        "IsEnable": true,
        "SrcProtocol": cap[i].captureX2Transport,
        "SrcIP": cap[i].captureX2IP,
        "SrcPort": cap[i].captureX2Port,
        "DstProtocol": sett[i].X2Transport,
        "DstIp": sett[i].clientIP,
        "DstDetails": sett[i].X2Port
      };
      var CC = {
        "IsEnable": true,
        "SrcProtocol": cap[i].captureX3Transport,
        "SrcIP": cap[i].captureX3IP,
        "SrcPort": cap[i].captureX3Port,
        "DstProtocol": sett[i].X3Transport,
        "DstIp": sett[i].clientIP,
        "DstDetails": sett[i].X3Port
      };
      mappings.push(CD);
      mappings.push(CC);

      injectSettings["mappings"] = mappings;
      workersInjectParams.push(btoa(JSON.stringify(injectSettings)));
    }
    jsObj["details"] = workersInjectParams;

    return JSON.stringify(jsObj);
  }
}
