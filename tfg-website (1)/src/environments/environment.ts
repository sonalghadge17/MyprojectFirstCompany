// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultauth: 'fakebackend',
  // passwordId = 'W5fH8uV!dRtY#4zQ9' // access key

  // multiple urls
  userApiUrl: 'http://192.168.1.54:9193',  //user
  buyerApiUrl: 'http://192.168.1.54:9191',  //buyer
  supplierApiUrl: 'http://192.168.1.54:9192',  //supplier mushahid
  productApiUrl: 'http://192.168.1.54:9194',  //product

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
