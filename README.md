# logseq-plugin-pdf-print

Print a Logseq page as a PDF using `window.print()`, preserving most page styles.

Fork of [supery-chen/logseq-plugin-pdf-print](https://github.com/supery-chen/logseq-plugin-pdf-print).

## Example

![example](assets/examples.gif)

## Tips

1. If there is no response when clicking, check that the system printer service (`Print Spooler` on Windows) is running, then retry.
2. Print theme: Settings → Plugins → PDF Print → **Print theme**. Choose `aware` to keep Logseq theme colors, or `unaware` for light (theme-ignored) printing.
