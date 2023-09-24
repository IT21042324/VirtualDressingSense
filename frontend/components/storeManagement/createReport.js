import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { Platform } from "react-native";
import * as Sharing from "expo-sharing";
import { pdf_html } from "../globalConstants";

export const CreateReport = async () => {
  try {
    let options = {
      html: pdf_html,
      fileName: "Report",
      directory: "Downloads",
      base64: true,
    };
    let file = await Print.printToFileAsync(options);

    if (file.uri) {
      console.log("PDF Created");

      FileSystem.getContentUriAsync(file.uri).then((cUri) => {
        if (Platform.OS === "ios") {
          Sharing.shareAsync(cUri);
        } else {
          IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
            data: cUri,
            flags: 1,
            type: "application/pdf",
          });
        }
      });
    } else {
      console.error("Report Creation Failed");
    }
  } catch (error) {
    console.error(error);
  }
};
