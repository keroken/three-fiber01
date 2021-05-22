import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './App.css';

const BoxMotion = (props) => {
  useFrame(({ clock }) => {
    props.meshRef.current.rotation.x += 0.05;
    props.meshRef.current.rotation.y += 0.01;
  });
  return null;
};

const TorusMotion = (props) => {
  useFrame(({ clock }) => {
    props.meshRef.current.rotation.x += 0.01;
    props.meshRef.current.rotation.y += 0.01;
  });
  return null;
};

function App() {
  const boxMesh = React.useRef();
  const sphereMesh = React.useRef();

  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, 7] }}>
        <ambientLight intensity={0.5}  />
        <pointLight position={[10, 10, 10]} />
        <mesh ref={boxMesh} position={[2, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"#ff00ff"} />
        </mesh>
        <mesh ref={sphereMesh} position={[-2, 0, 0]}>
          <torusGeometry args={[1, 0.3, 8, 8]} />
          <meshStandardMaterial color={"#a0ff00"} side={THREE.DoubleSide} />
        </mesh>
        <BoxMotion meshRef={boxMesh} />
        <TorusMotion meshRef={sphereMesh} />
      </Canvas>
    </div>
  );
}

export default App;
