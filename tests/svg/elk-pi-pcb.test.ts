import { expect, test } from "bun:test"
import { parseAltiumBinaryPcbDoc, serializeAltiumPcbToSvg } from "../../lib"
import { readReferenceBytes } from "./read-reference"

test("renders the complete binary Elk Pi PCB", async () => {
  const source = await readReferenceBytes("elk-pi.PcbDoc")
  const document = parseAltiumBinaryPcbDoc(source)
  const svg = serializeAltiumPcbToSvg(document, {
    title: "Elk Pi PCB",
    layers: ["TOP", "TOPOVERLAY"],
  })

  expect(svg).toContain('data-record="Region"')
  expect(svg).toContain('data-record="Text"')
  expect(svg).toContain('fill-rule="evenodd"')
  expect(svg).toContain('data-layer="TOPOVERLAY"')
  await expect(svg).toMatchSvgSnapshot(import.meta.path)
}, 20_000)
