import React, { Component } from 'react'
import { Viewer } from "@xeokit/xeokit-sdk/src/viewer/Viewer"
import { GLTFLoaderPlugin } from "@xeokit/xeokit-sdk/src/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin"
import { NavCubePlugin } from "@xeokit/xeokit-sdk/src/plugins/NavCubePlugin/NavCubePlugin"
import { SectionPlanesPlugin } from "@xeokit/xeokit-sdk/src/plugins/SectionPlanesPlugin/SectionPlanesPlugin"
import PropTypes from 'prop-types'
// import './layout.css'
import { v4 } from 'uuid'

export default class LBDviewer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    componentDidMount() {
        const viewer = this.setViewer()
        // let extension = this.props.model.split('.')
        //extension = extension[extension.length - 1]
        let extension = "gltf"

        let loader
        loader = new GLTFLoaderPlugin(viewer);
         // else if (extension.toLowerCase() === 'xkt') {
        //     loader = new XKTLoaderPlugin(viewer)
        //     modelProps.metaModelSrc = this.props.metaModel
        // }

        new NavCubePlugin(viewer, {
            canvasId: "myNavCubeCanvas",
            visible: true
        });

        // const sectionPlanes = new SectionPlanesPlugin(viewer, {
        //     overviewCanvasId: "mySectionPlanesOverviewCanvas",
        //     overviewVisible: true
        // });

        // sectionPlanes.createSectionPlane({
        //     id: "mySectionPlaneY",
        //     pos: [0, -3, 0],
        //     dir: [1.0, 0.0, 0.0]
        // });

        // sectionPlanes.createSectionPlane({
        //     id: "mySectionPlaneZ",
        //     pos: [0, 3, 0],
        //     dir: [0.0, -1, 0]
        // });

        // sectionPlanes.createSectionPlane({
        //     id: "mySectionPlaneX",
        //     pos: [0,0, 5],
        //     dir: [0.0, 0, -1]
        // });
        this.props.models.forEach((src) => {
            const modelProps = {
                id: src,
                src,
                edges: true,
                performance: true,
            }
            try {
                const model = loader.load(modelProps);
                model.on("loaded", () => {
                    viewer.cameraFlight.jumpTo(model)
                })
            } catch (error) {
                console.log('error', error)
            }

        })

        const scene = viewer.scene;
        const camera = scene.camera;
        camera.projection = this.props.projection || "ortho"

        var lastEntity = null;

        viewer.scene.input.on("mousemove", (coords) => {

            var hit = viewer.scene.pick({
                canvasPos: coords
            });
            if (hit) {
                if (!lastEntity || hit.entity.id !== lastEntity.id) {
                    if (lastEntity) {
                        lastEntity.opacity = this.state.lastOpacity;
                    }
                    lastEntity = hit.entity;
                    this.setState({lastOpacity: hit.entity.opacity})

                    hit.entity.opacity = 0.6;
                }
            } else {
                if (lastEntity) {
                    lastEntity.opacity = this.state.lastOpacity;
                }
            }
        });

        var lastEntityColorize = null;
        var lastColorize = null;

        viewer.cameraControl.on("picked", async (pickResult) => {

            if (!lastEntityColorize || pickResult.entity.id !== lastEntityColorize.id) {
                if (pickResult.entity) {
                    try {
                        pickResult.entity.highlighted = 1
                        // let ifcGuid
                        // if (extension.toLowerCase() === 'gltf') {
                        //     ifcGuid = this.getGuid(pickResult.entity.id)
                        // } else if (extension.toLowerCase() === 'xkt') {
                        //     ifcGuid = pickResult.entity.id
                        // }

                        // if (lastEntityColorize) {
                        //     lastEntityColorize.colorize = lastColorize;
                        // }

                        let entities = this.state.viewer.scene.objects
                        Object.keys(entities).forEach(ent => {
                            if (entities[ent].id !== pickResult.entity.id) {
                                entities[ent].highlighted = false
                            }
                        })

                        // if (ifcGuid === "0000000000000000000000") {
                            // this.setState({ selection: [pickResult.entity.id] })
                            const distribution = pickResult.entity.model.id
                            let dataset = distribution.split("/")
                            dataset.pop()
                            dataset = dataset.join("/") + '/'
                            const reference = {
                                identifier: pickResult.entity.id, 
                                distribution,
                                dataset
                            }
                            this.props.onSelect([pickResult.entity.id])
                        // } else {
                        //     // this.setState({ selection: [pickResult.entity.id] })
                        //     this.props.onSelect([{guid: ifcGuid}])
                        // }


                    } catch (error) {
                        this.setState({ selection: [] })

                    }
                }


                // lastEntityColorize = pickResult.entity;
                // lastColorize = pickResult.entity.colorize.slice();
                // pickResult.entity.colorize = [0.0, 1.0, 0.0];
            }
        });

        viewer.cameraControl.on("pickedNothing", () => {
            let entities = this.state.viewer.scene.objects
            Object.keys(entities).forEach(ent => {
                entities[ent].highlighted = false
            })
            this.setState({ selection: [] })
            this.props.onSelect([])

            // if (lastEntityColorize) {
            //     lastEntityColorize.colorize = lastEntityColorize;
            //     lastEntityColorize = null;
            // }
        });

        this.setState({ viewer })
    }

    getGuid(gltfGuid){
        var guidChars = [["0", 10], ["A", 26], ["a", 26], ["_", 1], ["$", 1]].map(function (a) {
            var li = [];
            var st = a[0].charCodeAt(0);
            var en = st + a[1];
            for (var i = st; i < en; ++i) {
                li.push(i);
            }
            return String.fromCharCode.apply(null, li);
        }).join("");

        var b64 = function (v, len) {
            var r = (!len || len == 4) ? [0, 6, 12, 18] : [0, 6];
            return r.map(function (i) {
                return guidChars.substr(parseInt(v / (1 << i)) % 64, 1)
            }).reverse().join("");
        };

        var compressGuid = function (g) {
            g = g.replace(/-/g, "");
            var bs = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map(function (i) {
                return parseInt(g.substr(i, 2), 16);
            });
            return b64(bs[0], 2) + [1, 4, 7, 10, 13].map(function (i) {
                return b64((bs[i] << 16) + (bs[i + 1] << 8) + bs[i + 2]);
            }).join("");
        };

        let uncompressed = gltfGuid.split("-")
        let uncompressed_string = ''
        uncompressed.forEach((p, id) => {
            if (0 < id && id < uncompressed.length - 2) {
                uncompressed_string += p + '-'
            } else if (id === uncompressed.length - 2) {
                uncompressed_string += p
            }
        })
        const id = compressGuid(uncompressed_string)
        return id
    }


    componentDidUpdate() {
        let entities = this.state.viewer.scene.objects
        const selection = this.props.selection
        console.log('props.selection', this.props.selection)
        if (selection !== this.state.lastQueried) {
            // selection.forEach(item => {
            //     console.log('item', item)
            //     console.log('entities.item', entities)
            //     entities[item].highlighted = true
            // })
            Object.keys(entities).forEach(ent => {
                if (selection.includes(entities[ent].id)) {
                    entities[ent].highlighted = true
                } else {
                    entities[ent].highlighted = false
                }})
            // this.setState({ lastQueried: selection, selection})
        }
    }

    setViewer() {
        const viewer = new Viewer({
            canvasId: "myCanvas",
            transparent: true
        })
        return viewer
    }

    render() {
        return (
            <div className="modelContainer" style={{ width: "100%", height: this.props.height}}>
                <canvas id="myCanvas" style={{ width: "100%", height: this.props.height}}></canvas>
                <canvas style={{height: "200px", width: "200px", position: "fixed", right: 0, bottom: 0}} className="navCube" id="myNavCubeCanvas"></canvas>
                <canvas id="mySectionPlanesOverviewCanvas" className="sections"></canvas>
            </div>
        )
    }
}

LBDviewer.propTypes = {
    projection: PropTypes.oneOf(['ortho', 'perspective']),
    height: PropTypes.number.isRequired,
    models: PropTypes.array.isRequired,
    metaModel: PropTypes.string,
    ifcGuidHandler: PropTypes.func
}

LBDviewer.defaultProps = {
    projection: "ortho",
    ifcGuidHandler: (guid) => { console.log(guid) },
    onSelect: (selection) => {console.log('guid', selection.guid)}
}