import React, { useState, useEffect } from "react";
import Viewer from "./Viewer";
import { QueryEngine } from '@comunica/query-sparql'
import main from "../validator";

//____________
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
//____________

const LBDviewer = (props) => {
  const mime = "gltf"
  // const [models, setModels] = useState("")
  const [dataset, setDataset] = useState("")
  const [selection, setSelection] = useState([])
  const [queryEngine, setQueryEngine] = useState(new QueryEngine())
  const [sources, getSources] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [usefullDatasets, setUsefullDatasets] = useState([])
  const [viaDatasets, setViaDatasets] = useState(true)

  //____
  const [datagraph, setDatagraph] = useState("");
  const [shapegraph, setShapegraph] = useState("");
  const [gltf, setGltf] = useState("");
  const [datagraphError, setDatagraphError] = useState(false);
  const [shapegraphError, setShapegraphError] = useState(false);
  const [gltfError, setGltfError] = useState(false);
 // const [resultgraph, setResultgraph]=useState("");
  let myvalresult="";
  //const [shapesgraph, setShapesgraph]=usestate('');
  //const [gltf, setGltf]=usestate('');

  const handleSubmit = async e => {
    e.preventDefault()          //prevent the default action when data is entered, i.e page is refreshed
    setDatagraphError(false)
    setShapegraphError(false)
    setGltfError(false)

    if (datagraph == '') {
      setDatagraphError(true)
    }
    if (shapegraph == '') {
      setShapegraphError(true)
    }
    if (gltf == '') {
      setGltfError(true)
    }

    if (datagraph && shapegraph && gltf) {
/*       var values=await main(datagraph,shapegraph, gltf)
      console.log('datatype of values is ', typeof values)
      var first=values[0]
      console.log('first value is ', values[0])
      var second=value[1]
      const r=values[0]
      console.log('second value is ', values[1]) */

      

/*       const r = await main(datagraph, shapegraph, gltf)
      setSelection(s => r) */

      const [r, phew] = await main(datagraph, shapegraph, gltf)
      setSelection(s => r)
      myvalresult=phew
      
    }

    console.log("my validation results: ", myvalresult)
    alert( myvalresult)
  }

  /*   const [value, setValue]=useState("");
    const handleChange=e=>{
      console.log('Typed => $(e.target.value')
      setValue(e.target.value)
      console.log(value)
    } */

  /*   const handleTextFieldChange=e=> {
      setDatagraph(e.target.value);
      console.log(setDatagraph.value);
    } */


  /*   async function validate(){
      const r=await main()
      setSelection(s => r)
    } */

  // useEffect(() => {
  //   const filtered = []

  //   if (viaDatasets) {
  //     const distributions = props.activeDatasets.map(i => i.distributions).flat().map(i => i.url)
  //     props.selectedElements.forEach(item => {
  //       item.references.forEach(ref => {
  //         if (distributions.includes(ref.distribution)) {
  //           filtered.push(ref.identifier)
  //         }
  //       })
  //     })
  //     setSelection(prev => filtered)
  //   } else {
  //     const m = new Set()
  //     props.selectedElements.forEach(item => {
  //       item.references.forEach(ref => {
  //         if (ref.mediatype.includes("gltf")) {
  //           filtered.push(ref.identifier)
  //           m.add(ref.distribution)
  //         }
  //       })
  //     })
  //     setModels(prev => Array.from(m))
  //   }
  //   setSelection(prev => filtered)

  // }, [props.selectedElements])

  //   useEffect(() => {
  //     const m = []
  //     const usefull = props.activeDatasets.filter(ds => {
  //       for (const dist of ds.distributions) {
  //         if (dist.contentType.includes(mime)) {
  //           m.push(dist.url)
  //           return true
  //         }
  //       }
  //       return false
  //     })
  //     console.log('models', m)
  //     setModels(i => m)
  //     setUsefullDatasets(usefull)
  // }, [props.activeDatasets])

  async function onSelect(sel) {
    console.log('sel', sel)
    setSelection(s => sel)
    // if (sel.length > 0) {
    //   const concepts = await props.activeProjects[0].getConceptsByIdentifier(sel, {queryEngine})
    //   console.log('concepts', concepts)
    //   props.setSelectedElements(prev => concepts)
    //   setSelection(sel.map(i =>i.identifier))
    // } else {
    //   setSelection(s => [])
    // }
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Data Graph URL"
          required
          onChange={(e) => setDatagraph(e.target.value)}
          error={datagraphError}
        />
        <TextField
          id="outlined-basic2"
          variant="outlined"
          required
          label="Shape Graph URL"
          onChange={(e) => setShapegraph(e.target.value)}
          error={shapegraphError}
        />
        <TextField
          id="outlined-basic3"
          variant="outlined"
          
          label="GLFT Data Graph URL"
          onChange={(e) => setGltf(e.target.value)}
          error={gltfError}
        />
        <Button
          type="submit"a
          variant="contained"
          onClick={handleSubmit}
        >
          View Violations
        </Button>
      </Box>
      <Box component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
      </Box>


      {props.models.length > 0 ? (
        <div>
          <Viewer
            height={550}
            models={props.models}
            projection={"perspective"}
            onSelect={onSelect}
            selection={selection}
          />
        </div>
      ) : (
        <div>
          <p style={{ paddingTop: "10%" }}>No glTF models selected </p>
        </div>
      )}
    </div>
  );
};

export default LBDviewer;

//The Validation results are: <output name="valresult"></output>