import { Html } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
const Login = () => {
  const boxRef = useRef();

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={boxRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={'#4CAF50'} />
      <Html position={[0, 1, 1.1]} transform>
        <div style={{ width: '100px', textAlign: 'center ' , borderRadius:'14px' }}>
          <input type="text" placeholder="Username" />
        </div>
      </Html>
      <Html position={[0, 0, 1.1]} transform>
        <div style={{ width: '100px', textAlign: 'center' }}>
          <input type="password" placeholder="Password" />
        </div>
      </Html>
      <Html position={[0, -1, 1.1]} transform>
        <button>Login</button>
      </Html>
    </mesh>
  );
};
export default Login;
