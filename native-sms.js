"use strict";
window.SecretNetSMS={
  available(){return !!window.SecretNetSMSBridge;},
  getPhoneNumber(){return Promise.resolve(window.SecretNetSMSBridge?.getPhoneNumber?.()||"");},
  sendSms(phone,body,clientId){if(!window.SecretNetSMSBridge?.sendSms)return Promise.reject(new Error("SMS natif indisponible."));window.SecretNetSMSBridge.sendSms(JSON.stringify({phone,body,clientId}));return Promise.resolve({ok:true});},
  getPendingSms(){try{return Promise.resolve(JSON.parse(window.SecretNetSMSBridge?.getPendingSms?.()||"[]"))}catch{return Promise.resolve([])}},
  clearPendingSms(ids){if(window.SecretNetSMSBridge?.clearPendingSms)window.SecretNetSMSBridge.clearPendingSms(JSON.stringify(ids||[]));return Promise.resolve({ok:true});}
};
