
export class CaptureInjectionSettings {
  X2Port: string;
  X2Transport: string;
  X3Port: string;
  X3Transport: string;
  clientIP: string;

  constructor() {
    this.X2Port = "0000";
    this.X2Transport = "TCP";
    this.X3Port = "1111";
    this.X3Transport = "TCP";
    this.clientIP = "127.0.0.1";
  }
}

export class CaptureInjectInfo {
  captureName: string;
  captureID: string;
  captureType: string;
  captureIC: string;
  captureICVal: string;
  switchDate: string;

  captureX2Port: string;
  captureX2IP: string;
  captureX2Transport: string;
  captureX3Port: string;
  captureX3IP: string;
  captureX3Transport: string;
  captureX2Protocol: string;
  captureX3Protocol: string;
  captureLength: string;


  constructor(capName: string, id: string) {
    this.captureName = capName;
    this.captureID = id;
  }

  public setCaptureParameters(
    capType: string,
    capIC: string,
    capICVal: string,
    switchDate: string,
    capX2Port: string,
    capX2Trans: string,
    capX2IP: string,
    capX3Port: string,
    capX3Trans: string,
    capX3IP: string,
    capX2Prot: string,
    capX3Prot: string,
    capLen: string

  ): void {
    this.captureType = capType;
    this.captureIC = capIC;
    this.captureICVal = capICVal;
    this.switchDate = switchDate;
    this.captureX2Port = capX2Port;
    this.captureX2IP = capX2IP;
    this.captureX2Transport = capX2Trans;
    this.captureX2Protocol = capX2Prot;

    this.captureX3Port = capX3Port;
    this.captureX3IP = capX3IP;
    this.captureX3Transport = capX3Trans;
    this.captureX3Protocol = capX3Prot;
    this.captureLength = capLen;
  }

}
