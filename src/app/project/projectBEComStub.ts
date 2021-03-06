

export class projectBEComStub {
	
	
	servUpdateCback: (jStr: string) => void ;
	
	constructor()
	{
	}
	
	public simulateUpdateReceived() {
		var jStr = "{\"projName\":\"Test Proj RX\",\"projID\":\"DK3bA5\",\"event-type\" : \"project-fetched\" ,\"projDetails\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum\",\"projOwner\":{\"name\":\"Marius\",\"role\":\"Contributor\",\"surname\":\"Aldea\",\"email\":\"\",\"id\":\"\"},\"project-members-arr\":[{\"name\":\"Daniel\",\"role\":\"Contributor\",\"surname\":\"Ciotoracu\",\"email\":\"\",\"id\":\"\"},{\"name\":\"Mihai\",\"role\":\"Contributor\",\"surname\":\"Cuatu\",\"email\":\"\",\"id\":\"\"}],\"project-capture-sets-arr\":[{\"capSetName\":\"CS VoLTE UMD 1\",\"capSetCaptures\":[{\"captureName\":\"Leo CS VoLTE simple call\",\"captureID\":\"ADGr123\",\"captureX2Port\":\"5001\",\"captureX2Transport\":\"TCP\",\"captureX2Protocol\":\"ETSI 102 232-5 v331\",\"captureX3Port\":\"6001\",\"captureX3Transport\":\"TCP\",\"captureX3Protocol\":\"ULIC RTP\",\"switchDate\":\"15-01-2011\",\"captureType\":\"CD&CC\",\"captureIC\":\"LIID\",\"captureICVal\":\"442312\"},{\"captureName\":\"Leo CS VoLTE location change\",\"captureID\":\"ADGr123\",\"captureX2Port\":\"5005\",\"captureX2Transport\":\"TCP\",\"captureX2Protocol\":\"ETSI 102 232-5 v331\",\"captureX3Port\":\"0000\",\"captureX3Transport\":\"unknown\",\"captureX3Protocol\":\"unknown\",\"switchDate\":\"15-01-2011\",\"captureType\":\"CD\",\"captureIC\":\"Phone\",\"captureICVal\":\"+31332442312\"},{\"captureName\":\"Leo CS VoLTE conference\",\"captureID\":\"ADGr123\",\"captureX2Port\":\"5001\",\"captureX2Transport\":\"TCP\",\"captureX2Protocol\":\"ETSI 102 232-5 v331\",\"captureX3Port\":\"6005\",\"captureX3Transport\":\"TCP\",\"captureX3Protocol\":\"ULIC RTP\",\"switchDate\":\"15-01-2011\",\"captureType\":\"CD&CC\",\"captureIC\":\"MSISDN\",\"captureICVal\":\"+31332442312\"}],\"capInjectionSett\":[{\"X2Port\":\"0000\",\"X2Transport\":\"TCP\",\"X3Port\":\"1111\",\"X3Transport\":\"TCP\",\"clientIP\":\"127.0.0.1\"},{\"X2Port\":\"0000\",\"X2Transport\":\"TCP\",\"X3Port\":\"1111\",\"X3Transport\":\"TCP\",\"clientIP\":\"127.0.0.1\"},{\"X2Port\":\"0000\",\"X2Transport\":\"TCP\",\"X3Port\":\"1111\",\"X3Transport\":\"TCP\",\"clientIP\":\"127.0.0.1\"}],\"capSetX2Protocol\":\"ETSI 102 232-5 v331\",\"capSetX3Protocol\":\"ULIC RTP\"},{\"capSetName\":\"MPD Orage UMD\",\"capSetCaptures\":[{\"captureName\":\"Leo MPD Browsing\",\"captureID\":\"ADGr123\",\"captureX2Port\":\"22\",\"captureX2Transport\":\"FTP\",\"captureX2Protocol\":\"ETSI 102 232-5 v331\",\"captureX3Port\":\"6001\",\"captureX3Transport\":\"TCP\",\"captureX3Protocol\":\"ULIC EPS\",\"switchDate\":\"18-01-2011\",\"captureType\":\"CD&CC\",\"captureIC\":\"IMSI\",\"captureICVal\":\"34312561\"},{\"captureName\":\"Leo MPD on/off\",\"captureID\":\"ADGr123\",\"captureX2Port\":\"22\",\"captureX2Transport\":\"FTP\",\"captureX2Protocol\":\"ETSI 102 232-5 v331\",\"captureX3Port\":\"0000\",\"captureX3Transport\":\"unkonwn\",\"captureX3Protocol\":\"unknown\",\"switchDate\":\"18-01-2011\",\"captureType\":\"CD\",\"captureIC\":\"IMSI\",\"captureICVal\":\"34312561\"}],\"capInjectionSett\":[{\"X2Port\":\"0000\",\"X2Transport\":\"TCP\",\"X3Port\":\"1111\",\"X3Transport\":\"TCP\",\"clientIP\":\"127.0.0.1\"},{\"X2Port\":\"0000\",\"X2Transport\":\"TCP\",\"X3Port\":\"1111\",\"X3Transport\":\"TCP\",\"clientIP\":\"127.0.0.1\"}],\"capSetX2Protocol\":\"ETSI 33 108 v271\",\"capSetX3Protocol\":\"ULIC EPS\"}]}";
	
		if(this.servUpdateCback!=null)
			this.servUpdateCback(jStr);
	}
	public simulateConnect(servAddr: string, servPort: string):void  {
		var jStr = "{\"event-type\" : \"connection-success\" ,\"message\":\"welcome\"}";
		this.servUpdateCback(jStr);
	}
}