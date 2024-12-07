The solution is to check the camera status using the `onCameraReady` callback and only call `takePictureAsync` after the camera is ready.  This ensures that `takePictureAsync` is invoked only when the camera is fully functional.

```javascript
import { Camera, CameraType } from 'expo-camera';
import React, { useState, useRef, useEffect } from 'react';
import { Button, View } from 'react-native';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [cameraStatus, setCameraStatus] = useState('unloaded');
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraStatus === 'ready') {
      const options = { quality: 1, base64: true };
      const picture = await cameraRef.current.takePictureAsync(options);
      setPhoto(picture);
    }
  };

  const handleCameraReady = () => {
    setCameraStatus('ready');
  };

  if (hasPermission === null) {
    return <View />; // While asking for permission
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={CameraType.back}
        ref={cameraRef}
        onCameraReady={handleCameraReady}
      >
        <Button title="Take Picture" onPress={takePicture} />
      </Camera>
      {photo && <Image source={{ uri: `data:image/jpeg;base64,${photo.base64}` }} style={{ width: 300, height: 300 }} />}
    </View>
  );
};
export default App;
```