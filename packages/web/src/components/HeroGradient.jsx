import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react"

export default function HeroGradient() {
  return (
    <ShaderGradientCanvas
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
      pixelDensity={1}
      fov={45}
    >
      <ShaderGradient
        control="props"
        animate="on"
        uSpeed={0.2}
        uStrength={1.8}
        uDensity={1.0}
        uFrequency={0.6}
        uAmplitude={0.5}
        cDistance={38}
        cPolarAngle={120}
        cAzimuthAngle={160}
        lightType="3d"
        brightness={1.1}
        color1="#F7E96C"
        color2="#C084FC"
        color3="#0C0C0C"
        grain="off"
        reflection={0.1}
        enableTransition={false}
      />
    </ShaderGradientCanvas>
  )
}
