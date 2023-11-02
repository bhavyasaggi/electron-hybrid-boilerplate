const fs = require("fs");
const path = require("path");

const {
  name,
  appName,
  productName,
  description,
  version,
  author,
} = require("../../package.json");

const root = process.cwd();
const iconDir = path.resolve(root, "assets/icon");

if (process.env["WINDOWS_CODESIGN_FILE"]) {
  const certPath = path.join(__dirname, "win-certificate.pfx");
  const certExists = fs.existsSync(certPath);

  if (certExists) {
    process.env["WINDOWS_CODESIGN_FILE"] = certPath;
  }
}

const config = {
  hooks: {},
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        devContentSecurityPolicy:
          "default-src 'none'; img-src 'self' http: https: data:; media-src 'none'; child-src 'self'; object-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' ws: wss: http: https:; font-src 'self' http: https:;",
        devServer: {
          // Disallow browser from opening/reloading with HMR in development mode.
          open: false,
          liveReload: false,
          hot: "only",
        },
        mainConfig: path.join(root, ".inc/webpack/webpack.main.config.js"),
        renderer: {
          nodeIntegration: false,
          config: path.join(root, ".inc/webpack/webpack.renderer.config.js"),
          entryPoints: [
            {
              html: path.join(root, "src/template/index.html"),
              js: path.join(root, "src/electron/renderer/index.jsx"),
              name: "main_window",
              preload: {
                js: path.join(root, "src/electron/preload/index.js"),
              },
            },
          ],
        },
      },
    ],
  ],
  packagerConfig: {
    name: name,
    executableName: name,
    // asar: true,
    // icon: iconDir,
    appBundleId: appName,
    // usageDescription: {},
    appCategoryType: "public.app-category.developer-tools",
    // ignore: "/ffmpeg|/user/settings/user_settings.json|/logs|/.vscode|/temp",
    // protocols: [
    //   {
    //     name: 'Launch Protocol',
    //     schemes: [name],
    //   },
    // ],
    win32metadata: {
      CompanyName: author,
      OriginalFilename: name,
    },
    // osxSign: {
    //   identity: 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)',
    //   hardenedRuntime: true,
    //   'gatekeeper-assess': false,
    //   entitlements: 'static/entitlements.plist',
    //   'entitlements-inherit': 'static/entitlements.plist',
    //   'signature-flags': 'library',
    // },
  },
  makers: [
    // MSI
    {
      name: "@electron-forge/maker-wix",
      config: {
        name,
        description,
        icon: path.resolve(iconDir, "icon.ico"),
        appUserModelId: appName,
        language: 1033,
        manufacturer: author,
        version,
        features: {
          autoUpdate: false,
          autoLaunch: {
            enabled: false,
            arguments: [],
          },
        },
        beforeCreate: (msiCreator) => {
          // msiCreator.icon = iconDir;
          // console.log(msiCreator);
        },
      },
    },
    // EXE
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        noDelta: true,
        noMsi: true,
      },
    },
    // DMG
    {
      name: "@electron-forge/maker-dmg",
      config: {
        name: name,
        overwrite: true,
        icon: path.resolve(iconDir, "icon.png"),
        // format: 'ULFO',
      },
    },
  ],
  publishers: [],
};

function notarizeMaybe() {
  if (process.platform !== "darwin") {
    return;
  }

  if (!process.env.CI) {
    console.log(`Not in CI, skipping notarization`);
    return;
  }

  if (!process.env.APPLE_ID || !process.env.APPLE_ID_PASSWORD) {
    console.warn(
      "Should be notarizing, but environment variables APPLE_ID or APPLE_ID_PASSWORD are missing!"
    );
    return;
  }

  config.packagerConfig.osxNotarize = {
    appBundleId: appName,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
    ascProvider: "LT94ZKYDCJ",
  };
}

notarizeMaybe();

// Finally, export it
module.exports = config;
