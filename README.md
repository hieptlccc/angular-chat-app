# How to Build Angular Chat Application

Read the full tutorial here: [**>> How to Build Angular Chat Application**](https://www.cometchat.com/tutorials/#)

## Technology

This demo uses:

- CometChat Pro
- CometChat UI Kit
- Firebase
- Angular
- Uuid
- Validator
- @ctrl/ngx-emoji-mart

## Running the demo

To run the demo follow these steps:

1. [Head to CometChat Pro and create an account](https://app.cometchat.com/signup)
2. From the [dashboard](https://app.cometchat.com/apps), add a new app called **"angular-chat-app"**
3. Select this newly added app from the list.
4. From the Quick Start copy the **APP_ID, APP_REGION and AUTH_KEY**. These will be used later.
5. Also copy the **REST_API_KEY** from the API & Auth Key tab.
6. Navigate to the Users tab, and delete all the default users and groups leaving it clean **(very important)**.
7. Download the repository [here](https://github.com/hieptlccc/angular-chat-app/archive/main.zip) or by running `git clone https://github.com/hieptlccc/angular-chat-app.git` and open it in a code editor.
8. [Head to Firebase and create a new project](https://console.firebase.google.com)
9. Import and inject your secret keys in the **src/environments/environment.ts.ts** file containing your CometChat and Firebase in this manner.

```js
export const environment = {
  production: false,
  firebaseApiKey: "xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx",
  firebaseAuthDomain: "xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx",
  firebaseDatabaseUrl: "xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx",
  firebaseStorageBucket: "xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx",
  firebaseProjectId: "xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx",
  firebaseMessageSenderId: "xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx",
  firebaseAppId: "xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx",
  cometChatAppId: "xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx",
  cometChatRegion: "xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx",
  cometChatAuthKey: "xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx",
  cometChatApiKey: "xxx - xxx - xxx - xxx - xxx - xxx - xxx - xxx",
};
```

10. Make sure to exclude **.env** in your gitIgnore file from being exposed online.
11. Run the following command to install the app.

```sh
    npm install
    ng serve
```

Questions about running the demo? [Open an issue](https://github.com/hieptlccc/angular-chat-app/issues). We're here to help ✌️

## Useful links

- 🏠 [CometChat Homepage](https://app.cometchat.com/signup)
- 🚀 [Create your free account](https://app.cometchat.com/apps)
- 📚 [Documentation](https://prodocs.cometchat.com)
- 👾 [GitHub](https://www.github.com/cometchat-pro)
- 🔥 [Firebase](https://console.firebase.google.com)
- 🔷 [Angular](https://angular.io/docs)
