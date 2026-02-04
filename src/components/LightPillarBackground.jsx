import LightPillar from './LightPillar';
function LightPillarBackground() {
    return (
<div style={{ width: '100%', height: '1000px', position: 'relative' }}>
  <LightPillar
    topColor="#110c55"
    bottomColor="#9eb1ff"
    intensity={1}
    rotationSpeed={0.3}
    glowAmount={0.002}
    pillarWidth={3}
    pillarHeight={0.4}
    noiseIntensity={0.5}
    pillarRotation={25}
    interactive={true}
    mixBlendMode="screen"
    quality="high"
/>
</div>)}  export default LightPillarBackground;
  