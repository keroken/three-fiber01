import React, { useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './App.css';
import randomLetter from './assets/random-letter.png';

const BoxMotion = (props) => {
  useFrame(({ clock }) => {
    props.meshRef.current.rotation.x += 0.05;
    props.meshRef.current.rotation.y += 0.01;
  });
  return null;
};

const SphereMotion = (props) => {
  useFrame(({ clock }) => {
    props.meshRef.current.rotation.x += 0;
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
  const boxMesh2 = React.useRef();
  const sphereMesh = React.useRef();
  const torusMesh = React.useRef();
  const [activeBox, setActiveBox] = useState(false);
  const [activeSphere, setActiveSphere] = useState(false);
  const [activeTorus, setActiveTorus] = useState(false);
  const [hover, setHover] = useState(false);
  const texture = useMemo(() => new THREE.TextureLoader().load(randomLetter), []);

  const Box = (props) => {
    return (
      <mesh
      {...props}
      ref={boxMesh}
      scale={activeBox ? [2, 2, 2] : [1, 1, 1]}
      onClick={() => setActiveBox(!activeBox)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={activeBox ? "#ff00ff" : "#820fff"}>
        <primitive attach="map" object={texture} />
      </meshStandardMaterial>
    </mesh>
    );
  };

  const Box2 = (props) => {
    return (
      <mesh
      {...props}
      ref={boxMesh2}
      scale={activeBox ? [2, 2, 2] : [1, 1, 1]}
      onClick={() => setActiveBox(!activeBox)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={activeBox ? "#ff00ff" : "#820fff"}>
        <primitive attach="map" object={texture} />
      </meshStandardMaterial>
    </mesh>
    );
  };

  const Sphere = (props) => {
    return (
      <mesh
      {...props}
        ref={sphereMesh}
        scale={activeSphere ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={() => setActiveSphere(!activeSphere)}
      >
        <sphereBufferGeometry args={[2, 32, 16]} />
        <meshStandardMaterial wireframe color={activeSphere ? "#ff6633" : "#0f3dc7"}>
          {/* <primitive attach="map" object={texture} /> */}
        </meshStandardMaterial>
      </mesh>
    );
  };

  const Torus = (props) => {
    return (
      <mesh
        {...props}
        ref={torusMesh}
        scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={() => setActiveTorus(!activeTorus)}
        onPointerOver={e => setHover(true)}
        onPointerOut={e => setHover(false)}
      >
        <torusBufferGeometry args={[1, 0.3, 8, 8]} />
        <meshStandardMaterial color={activeTorus ? "#a0ff00" : "#aa99ff"} side={THREE.DoubleSide}>
          <primitive attach="map" object={texture} />
        </meshStandardMaterial>
      </mesh>
    );
  };

  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, 7] }}>
        <ambientLight intensity={0.5}  />
        <pointLight position={[10, 10, 10]} />
        <Box position={[2, 0, 0]} />
        <Box2 position={[4, 0, 2]} />
        <Sphere position={[0, 0, -3]} />
        <Torus position={[-2, 0, 0]}  />
        <BoxMotion meshRef={boxMesh} />
        <BoxMotion meshRef={boxMesh2} />
        <SphereMotion meshRef={sphereMesh} />
        <TorusMotion meshRef={torusMesh} />
      </Canvas>
    </div>
  );
}

export default App;
