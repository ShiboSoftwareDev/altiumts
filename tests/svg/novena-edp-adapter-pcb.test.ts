import { expect, test } from "bun:test"
import { parseAltiumBinaryPcbDoc, serializeAltiumPcbToSvg } from "../../lib"
import { readReferenceBytes } from "./read-reference"

test("renders the complete Novena eDP adapter binary PCB", async () => {
  const source = await readReferenceBytes("novena-edp-adapter-dvt1.PcbDoc")
  const document = parseAltiumBinaryPcbDoc(source)
  const svg = serializeAltiumPcbToSvg(document, {
    title: "Novena eDP adapter DVT1 PCB",
    layers: ["TOP", "TOPOVERLAY"],
  })

  expect(svg).toContain('data-record="Fill"')
  expect(svg).toContain('data-layer="TOPOVERLAY"')
  expect(svg).toContain('transform="rotate(-270')
  await expect(svg).toMatchSvgSnapshot(import.meta.path)
}, 20_000)
