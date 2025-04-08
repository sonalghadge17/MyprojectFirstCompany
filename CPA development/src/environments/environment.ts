
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl:'http://cpa.appdemo.in:3636/cpa-api-service',  

  // apiUrl: "http://cpaadmin.appdemo.in", //Server Url
  // apiUrl: "http://192.168.1.32:9099/cpa-api-service", //vijay
  apiUrl: "http://192.168.1.37:9099/cpa-api-service", //vijay
  // wssUrl: "http://192.168.1.8:9099/cpa-api-service/websocket", //localUrl
  // apiUrl: "http://192.168.1.37:9099/cpa-api-service",//abhijeet
  // apiUrl:"http://192.168.1.8:9099/cpa-api-service/websocket",
 
  defaultauth: 'fakebackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
