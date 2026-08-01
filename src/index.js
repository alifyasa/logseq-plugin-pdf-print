import "@logseq/libs";

const model = {
  printPdf() {
    const mode = logseq.settings?.printTheme ?? "aware";
    parent.document.documentElement.dataset.pdfPrintTheme = mode;

    fetch('print.js')
      .then(response => response.text())
      .then(jsContent => {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.text = jsContent;
        parent.document.body.appendChild(script);
        parent.document.body.removeChild(script);
      })
      .catch(error => {
        console.error('#logseq-plugin-pdf-print js load error:', error);
      });

  },
};

async function main() {
  logseq.useSettingsSchema([
    {
      key: "printTheme",
      type: "enum",
      default: "aware",
      title: "Print theme",
      description: "Theme colors keeps the current Logseq theme. Light ignores the theme and prints with a light background.",
      enumChoices: ["aware", "unaware"],
      enumPicker: "radio",
    },
  ]);

  fetch('print.css')
    .then(response => response.text())
    .then(cssContent => {
      logseq.provideStyle(cssContent);
      logseq.App.registerUIItem("toolbar", {
        key: `logseq-plugin-pdf-print`,
        template: `<a data-on-click="printPdf" title="PDF" class="button"><i class="ti ti-printer"></i></a>`,
      });
      console.log("#logseq-plugin-pdf-print loaded");
    })
    .catch(error => {
      console.error('#logseq-plugin-pdf-print load error:', error);
    });
}

logseq.ready(model, main).catch(console.error);
