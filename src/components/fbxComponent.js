import React, { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import pages
import DefaultModel from "./defaultModel";
import AnimatedModel from "./animatedModel";

export default function FbxComponent(props) {
    return (
        <Canvas style={{width: "758px", height: "433px"}} camera={{ position: [0, 0, 1.5], zoom: 2.5 }}>
          <OrbitControls />
          <ambientLight intensity={0.6} />
          <directionalLight intensity={0.5} />
          <Suspense fallback={null}>
            <Model model={props.model} />
          </Suspense>
        </Canvas>
    )
}

function Model(props) {
    if (props.model === 'test.glb') { return <DefaultModel model={props.model} /> }
    else { return <AnimatedModel model={props.model} /> }
  }
  