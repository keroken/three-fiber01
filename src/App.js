import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import './App.css';

const AnimateFrame = (props) => {
  useFrame(({ clock }) => {
    props.meshRef.current.rotation.x += 0.01;
    props.meshRef.current.rotation.y += 0.01;
  });
  return null;
};

function App() {
  const myMesh = React.useRef();

  return (
    <div id="canvas-container">
      <Canvas>
        <mesh ref={myMesh}>
          <boxGeometry />
          <meshNormalMaterial color={"#ff00ff"} />
        </mesh>
        <AnimateFrame meshRef={myMesh} />
      </Canvas>
    </div>
  );
}

export default App;
