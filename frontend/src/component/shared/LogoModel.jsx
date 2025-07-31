// components/LogoModel.jsx
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function LogoModel({ url }) {
  const ref = useRef();
  const { scene } = useGLTF(url);

  // Billboard effect: always face the camera
  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
    }
  });

  return <primitive ref={ref} object={scene} scale={0.5} />;
}
