
/* import fs, { readFileSync } from 'fs' */
import factory from 'rdf-ext'
/* import toFile from 'rdf-utils-fs/toFile.js'
import fromFile from 'rdf-utils-fs/fromfile.js'
import namespace from '@rdfjs/namespace'
import n3 from 'n3' */
import { QueryEngine } from '@comunica/query-sparql'
import { Readable } from 'stream'
import LBDviewer from "./Viewer/index.js"


import ParserN3 from '@rdfjs/parser-n3'
import SHACLValidator from 'rdf-validate-shacl'

const engine = new QueryEngine()

/* async function loadDataset(filePath) {
    const stream = fs.createReadStream(filePath)
    const parser = new ParserN3({ factory })
    return factory.dataset().import(parser.import(stream))
} */

async function loadDataset(url) {
    const data = await fetch(url).then(i => i.text())
    const parser = new ParserN3({ factory })

    const stream = new Readable({
        read: () => {
            stream.push(data)
            stream.push(null)
        }
    })
    return factory.dataset().import(parser.import(stream))
}

async function main(datagraph, shapegraph, gltf) {
    /*     const shapes = await loadDataset('ShapesDatabase/imageMetadata_shape.ttl')
        const data = await loadDataset('DataGraph/image_annotation_data_graph_withErrors.ttl') */
    const shapes = await loadDataset(shapegraph)
    const data = await loadDataset(datagraph)

    /*     const shapes = await loadDataset('https://raw.githubusercontent.com/sbalot/BIM4Ren_SHACLDB/main/Shapes/ifc_shapes.ttl')
        const data = await loadDataset('https://raw.githubusercontent.com/sbalot/BIM4Ren_SHACLDB/main/Data/BIM4Ren_DUNANT_cleaned_IFC2x3_LBD.ttl')
     */

    const validator = new SHACLValidator(shapes, { factory })
    const report = await validator.validate(data)

    //check conformance: true or false
    console.log("Console report is ", report.conforms)

    for (const result of report.results) {
        console.log(result.message)
        console.log(result.path)
        console.log(result.focusNode)

        //Find the GUID of the violating focus Node
        const myquery = `SELECT *
        WHERE {
            <https://www.ugent.be/myAwesomeFirstBIMProject#wall_6335f5c3-1a3d-409c-8baa-86e5028b364b> <http://lbd.arch.rwth-aachen.de/props#globalIdIfcRoot> ?ob.
            ?ob <https://w3id.org/seas/evaluation> ?ob2.
            ?ob2 <http://schema.org/value> ?ob3.
        }`
        let res = await engine.queryBindings(myquery, { sources: [datagraph] })
        console.log()
        const binding = await res.toArray();
        console.log('final result:', binding)
        const final = binding.map(i => {
            return i.get("ob3").value
        })

        return final

        /*         for (const quad1 of data.match((result.focusNode), ('http://lbd.arch.rwth-aachen.de/props#globalIdIfcRoot'), null)) {
                    for (const quad2 of data.match((quad1.object.value), ('https://w3id.org/seas/evaluation'), null)) {
                        for (const quad3 of data.match((quad2.object.value), ('http://schema.org/value'), null)) {
                            console.log('the guid is:', quad3.object.value)
                }
            }
        } */

        //console.log(report.dataset)
    }
}
export default main
