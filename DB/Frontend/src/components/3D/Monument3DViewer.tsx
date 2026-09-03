import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  RotateCcw, 
  Maximize, 
  Minimize, 
  Compass, 
  Layers, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Pause, 
  Landmark,
  Eye,
  Info
} from 'lucide-react';
import { MonumentData, HotspotAnnotation } from '../../types/monument';
import { useTranslation } from '../../hooks/useTranslation';

export interface Monument3DViewerProps {
  modelUrl: string | null;
  monument: MonumentData;
  activeHotspotId?: string | null;
  onSelectHotspot?: (hotspot: HotspotAnnotation) => void;
  className?: string;
  height?: string;
}

type LightingMode = 'golden-hour' | 'museum-daylight' | 'dusk';

/**
 * Procedural Architectural Reconstructions for Monuments
 * Provides authentic 3D spatial geometry in Three.js when .glb is being curated.
 */
function createProceduralMonumentMesh(monumentId: string): THREE.Group {
  const root = new THREE.Group();

  // Materials with physical heritage properties
  const basaltMat = new THREE.MeshStandardMaterial({
    color: 0x5a5048,
    roughness: 0.85,
    metalness: 0.1
  });
  const yellowBasaltMat = new THREE.MeshStandardMaterial({
    color: 0xbfa783,
    roughness: 0.75,
    metalness: 0.15
  });
  const darkRockMat = new THREE.MeshStandardMaterial({
    color: 0x36302a,
    roughness: 0.95,
    metalness: 0.05
  });
  const bronzeMat = new THREE.MeshStandardMaterial({
    color: 0xb8860b,
    roughness: 0.35,
    metalness: 0.8
  });
  const livingRootMat = new THREE.MeshStandardMaterial({
    color: 0x3b5323,
    roughness: 0.8,
    metalness: 0.05
  });
  const riverWaterMat = new THREE.MeshStandardMaterial({
    color: 0x1e3a5f,
    roughness: 0.1,
    metalness: 0.3,
    transparent: true,
    opacity: 0.8
  });
  const ahomBrickMat = new THREE.MeshStandardMaterial({
    color: 0x963d2c,
    roughness: 0.8,
    metalness: 0.1
  });

  const normalizedId = monumentId.toLowerCase();

  // 1. GATEWAY OF INDIA
  if (normalizedId.includes('gateway')) {
    // Stepped Plinth
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(16, 0.8, 10), basaltMat);
    plinth.position.y = 0.4;
    root.add(plinth);

    // Left & Right Main Basalt Pylons
    const leftPylon = new THREE.Mesh(new THREE.BoxGeometry(3.5, 9, 7), yellowBasaltMat);
    leftPylon.position.set(-4.5, 5, 0);
    root.add(leftPylon);

    const rightPylon = new THREE.Mesh(new THREE.BoxGeometry(3.5, 9, 7), yellowBasaltMat);
    rightPylon.position.set(4.5, 5, 0);
    root.add(rightPylon);

    // Central Arch Spanning Header
    const archTop = new THREE.Mesh(new THREE.BoxGeometry(6, 2.5, 7), yellowBasaltMat);
    archTop.position.set(0, 8.5, 0);
    root.add(archTop);

    // Central Dome Drum & Ribbed Dome
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 1.2, 32), yellowBasaltMat);
    drum.position.set(0, 10.3, 0);
    root.add(drum);

    const dome = new THREE.Mesh(new THREE.SphereGeometry(3.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), yellowBasaltMat);
    dome.position.set(0, 10.9, 0);
    root.add(dome);

    // 4 Corner Turrets / Minarets
    const turretPositions: [number, number][] = [
      [-6, -3.2],
      [-6, 3.2],
      [6, -3.2],
      [6, 3.2]
    ];
    turretPositions.forEach(([x, z]) => {
      const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.8, 12, 16), yellowBasaltMat);
      turret.position.set(x, 6.5, z);
      root.add(turret);

      const finial = new THREE.Mesh(new THREE.ConeGeometry(0.75, 2, 16), bronzeMat);
      finial.position.set(x, 13.5, z);
      root.add(finial);
    });

    // Central Dome Spire
    const mainSpire = new THREE.Mesh(new THREE.ConeGeometry(0.6, 2.5, 16), bronzeMat);
    mainSpire.position.set(0, 14.8, 0);
    root.add(mainSpire);
  }
  // 2. KAILASA TEMPLE (ELLORA CAVES)
  else if (normalizedId.includes('ellora') || normalizedId.includes('kailasa')) {
    // Escarpment Cliff Backdrop (Top-down excavation context)
    const cliff = new THREE.Mesh(new THREE.BoxGeometry(26, 14, 4), darkRockMat);
    cliff.position.set(0, 7, -8);
    root.add(cliff);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(4, 14, 16), darkRockMat);
    leftWall.position.set(-11, 7, 0);
    root.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(4, 14, 16), darkRockMat);
    rightWall.position.set(11, 7, 0);
    root.add(rightWall);

    // Temple Courtyard Plinth
    const templeBase = new THREE.Mesh(new THREE.BoxGeometry(14, 1.2, 16), basaltMat);
    templeBase.position.set(0, 0.6, 0);
    root.add(templeBase);

    // Main Sanctuary Vimana Tower (Multi-tiered pyramidal Dravidian Shikhara)
    for (let i = 0; i < 5; i++) {
      const w = 7.5 - i * 1.2;
      const tier = new THREE.Mesh(new THREE.BoxGeometry(w, 1.6, w), basaltMat);
      tier.position.set(0, 1.8 + i * 1.5, -2);
      root.add(tier);
    }
    const shikharaDome = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 16), basaltMat);
    shikharaDome.position.set(0, 9.6, -2);
    root.add(shikharaDome);

    const kalashFinial = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.2, 12), bronzeMat);
    kalashFinial.position.set(0, 11.2, -2);
    root.add(kalashFinial);

    // Mandapa Columned Hall
    const mandapa = new THREE.Mesh(new THREE.BoxGeometry(6.5, 3.5, 5), basaltMat);
    mandapa.position.set(0, 2.8, 2.5);
    root.add(mandapa);

    // Freestanding Victory Pillars (Dhwajastambhas)
    const pillarGeo = new THREE.CylinderGeometry(0.5, 0.6, 9, 16);
    const leftPillar = new THREE.Mesh(pillarGeo, basaltMat);
    leftPillar.position.set(-4.8, 4.8, 4.5);
    root.add(leftPillar);

    const rightPillar = new THREE.Mesh(pillarGeo, basaltMat);
    rightPillar.position.set(4.8, 4.8, 4.5);
    root.add(rightPillar);

    const tridentGeo = new THREE.ConeGeometry(0.4, 1.2, 8);
    const leftTri = new THREE.Mesh(tridentGeo, bronzeMat);
    leftTri.position.set(-4.8, 9.8, 4.5);
    root.add(leftTri);

    const rightTri = new THREE.Mesh(tridentGeo, bronzeMat);
    rightTri.position.set(4.8, 9.8, 4.5);
    root.add(rightTri);

    // Sculpted Elephant Blocks at plinth base
    const elephantGeo = new THREE.BoxGeometry(1.6, 1.4, 2.4);
    const elLeft = new THREE.Mesh(elephantGeo, darkRockMat);
    elLeft.position.set(-5.5, 0.8, -1);
    root.add(elLeft);

    const elRight = new THREE.Mesh(elephantGeo, darkRockMat);
    elRight.position.set(5.5, 0.8, -1);
    root.add(elRight);
  }
  // 3. RAIGAD FORT (SHIVAJI MAHARAJ STATUE & MEGHADAMBARI)
  else if (normalizedId.includes('raigad') || normalizedId.includes('shivaji')) {
    // Sahyadri Mountain Rock Base
    const mountainBase = new THREE.Mesh(new THREE.CylinderGeometry(11, 13, 2, 8), darkRockMat);
    mountainBase.position.set(0, 1, 0);
    root.add(mountainBase);

    // Bastion Wall
    const bastion = new THREE.Mesh(new THREE.CylinderGeometry(9, 9, 1.2, 16), basaltMat);
    bastion.position.set(0, 2.5, 0);
    root.add(bastion);

    // Octagonal Memorial Plinth
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.8, 1.0, 8), basaltMat);
    plinth.position.set(0, 3.5, 0);
    root.add(plinth);

    // 4 Pillars for Stone Meghadambari Canopy
    const pillarPositions: [number, number][] = [
      [-1.8, -1.8],
      [-1.8, 1.8],
      [1.8, -1.8],
      [1.8, 1.8]
    ];
    pillarPositions.forEach(([x, z]) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 4.5, 12), basaltMat);
      col.position.set(x, 6.2, z);
      root.add(col);
    });

    // Meghadambari Chhatri Canopy Roof
    const canopyRoof = new THREE.Mesh(new THREE.ConeGeometry(3.2, 1.8, 8), basaltMat);
    canopyRoof.position.set(0, 9.2, 0);
    root.add(canopyRoof);

    const kalash = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 12), bronzeMat);
    kalash.position.set(0, 10.3, 0);
    root.add(kalash);

    // Central Seated Bronze Statue Figure of Chhatrapati Shivaji Maharaj
    const throne = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 1.4), bronzeMat);
    throne.position.set(0, 4.6, 0);
    root.add(throne);

    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.45, 1.4, 12), bronzeMat);
    torso.position.set(0, 5.8, 0);
    root.add(torso);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), bronzeMat);
    head.position.set(0, 6.8, 0);
    root.add(head);

    const pagadi = new THREE.Mesh(new THREE.ConeGeometry(0.45, 0.5, 12), bronzeMat);
    pagadi.position.set(0, 7.2, 0);
    root.add(pagadi);
  }
  // 4. LIVING ROOT BRIDGE (MEGHALAYA)
  else if (normalizedId.includes('root') || normalizedId.includes('bridge')) {
    // Riverbed Valley Rocks
    const riverBed = new THREE.Mesh(new THREE.BoxGeometry(22, 1.2, 16), darkRockMat);
    riverBed.position.set(0, 0.5, 0);
    root.add(riverBed);

    // Winding River Stream
    const river = new THREE.Mesh(new THREE.BoxGeometry(22, 0.4, 6), riverWaterMat);
    river.position.set(0, 1.2, 0);
    root.add(river);

    // Natural River Monolith Boulders
    const boulderGeo = new THREE.DodecahedronGeometry(1.8, 1);
    const b1 = new THREE.Mesh(boulderGeo, darkRockMat);
    b1.position.set(-6, 2, -2.5);
    root.add(b1);

    const b2 = new THREE.Mesh(boulderGeo, darkRockMat);
    b2.position.set(6, 2, 2.5);
    root.add(b2);

    // Ficus Elastica Tree Trunks on Both Banks
    const trunkGeo = new THREE.CylinderGeometry(1.2, 2.2, 12, 16);
    const leftTrunk = new THREE.Mesh(trunkGeo, livingRootMat);
    leftTrunk.position.set(-8, 6, -1);
    root.add(leftTrunk);

    const rightTrunk = new THREE.Mesh(trunkGeo, livingRootMat);
    rightTrunk.position.set(8, 6, 1);
    root.add(rightTrunk);

    // Lower Living Root Bridge Tier
    const lowerDeck = new THREE.Mesh(new THREE.BoxGeometry(16, 0.5, 1.8), livingRootMat);
    lowerDeck.position.set(0, 3.2, -0.5);
    root.add(lowerDeck);

    // Lower Railings (curved root strands)
    const lowerRail = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 16, 8), livingRootMat);
    lowerRail.rotation.z = Math.PI / 2;
    lowerRail.position.set(0, 4.2, -1.3);
    root.add(lowerRail);

    // Upper Living Root Bridge Tier (Double Decker)
    const upperDeck = new THREE.Mesh(new THREE.BoxGeometry(16, 0.5, 1.8), livingRootMat);
    upperDeck.position.set(0, 6.2, 0.8);
    root.add(upperDeck);

    const upperRail = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 16, 8), livingRootMat);
    upperRail.rotation.z = Math.PI / 2;
    upperRail.position.set(0, 7.2, 1.6);
    root.add(upperRail);

    // Root Tendril Vines & Hanging Foliage
    for (let i = -6; i <= 6; i += 1.5) {
      const vine = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.2, 6), livingRootMat);
      vine.position.set(i, 4.8, 0.2);
      root.add(vine);
    }
  }
  // 5. RANG GHAR (ASSAM)
  else {
    // Stepped Brick Plinth
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(18, 1.0, 12), ahomBrickMat);
    plinth.position.set(0, 0.5, 0);
    root.add(plinth);

    // First Tier Royal Enclosure
    const tier1 = new THREE.Mesh(new THREE.BoxGeometry(15, 3.5, 9), ahomBrickMat);
    tier1.position.set(0, 2.7, 0);
    root.add(tier1);

    // Second Tier Open Amphitheater Gallery
    const tier2 = new THREE.Mesh(new THREE.BoxGeometry(11, 2.5, 6.5), ahomBrickMat);
    tier2.position.set(0, 5.7, 0);
    root.add(tier2);

    // Inverted-Boat Parabolic Vaulted Roof (Tai-Ahom Maku Boat Design)
    const roof = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 12, 16, 1, false, 0, Math.PI), ahomBrickMat);
    roof.rotation.z = Math.PI / 2;
    roof.rotation.y = Math.PI / 2;
    roof.position.set(0, 7.0, 0);
    root.add(roof);

    // Crocodile Finial & Crests
    const crest = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.5, 8), bronzeMat);
    crest.position.set(0, 9.2, 0);
    root.add(crest);
  }

  // Cast and receive shadows on all meshes
  root.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return root;
}

export const Monument3DViewer: React.FC<Monument3DViewerProps> = ({
  modelUrl,
  monument,
  activeHotspotId,
  onSelectHotspot,
  className = '',
  height = 'h-[440px] sm:h-[520px] lg:h-[580px]'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isWebGlSupported, setIsWebGlSupported] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isCustomGlbLoaded, setIsCustomGlbLoaded] = useState<boolean>(false);
  const [lightingMode, setLightingMode] = useState<LightingMode>(
    monument.modelConfig?.lightingPreset === 'museum-daylight'
      ? 'museum-daylight'
      : monument.modelConfig?.lightingPreset === 'warm-heritage' || monument.modelConfig?.lightingPreset === 'dusk'
      ? 'dusk'
      : 'golden-hour'
  );

  // Hotspot 2D projected screen positions
  const [projectedHotspots, setProjectedHotspots] = useState<
    Array<{ hotspot: HotspotAnnotation; screenX: number; screenY: number; isVisible: boolean }>
  >([]);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const ambLightRef = useRef<THREE.AmbientLight | null>(null);
  const defaultCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 6, 16));
  const defaultTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 2.5, 0));
  const reqAnimFrameRef = useRef<number | null>(null);

  // Check WebGL availability on mount
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setIsWebGlSupported(false);
      }
    } catch {
      setIsWebGlSupported(false);
    }
  }, []);

  // Update lighting colors dynamically based on preset
  const applyLightingPreset = useCallback((mode: LightingMode) => {
    if (!dirLightRef.current || !hemiLightRef.current || !ambLightRef.current || !sceneRef.current) return;

    if (mode === 'golden-hour') {
      sceneRef.current.background = new THREE.Color(0x161311);
      dirLightRef.current.color.setHex(0xffaa44);
      dirLightRef.current.intensity = 2.4;
      dirLightRef.current.position.set(12, 18, 10);
      hemiLightRef.current.color.setHex(0xffdfba);
      hemiLightRef.current.groundColor.setHex(0x3a2e28);
      hemiLightRef.current.intensity = 1.0;
      ambLightRef.current.color.setHex(0x553e2e);
      ambLightRef.current.intensity = 0.8;
    } else if (mode === 'museum-daylight') {
      sceneRef.current.background = new THREE.Color(0x181a1c);
      dirLightRef.current.color.setHex(0xfafafa);
      dirLightRef.current.intensity = 2.0;
      dirLightRef.current.position.set(8, 20, 12);
      hemiLightRef.current.color.setHex(0xffffff);
      hemiLightRef.current.groundColor.setHex(0x444444);
      hemiLightRef.current.intensity = 1.2;
      ambLightRef.current.color.setHex(0x666666);
      ambLightRef.current.intensity = 0.9;
    } else {
      // dusk / warm heritage
      sceneRef.current.background = new THREE.Color(0x110f13);
      dirLightRef.current.color.setHex(0xfa8855);
      dirLightRef.current.intensity = 1.8;
      dirLightRef.current.position.set(-10, 12, -8);
      hemiLightRef.current.color.setHex(0xf3a683);
      hemiLightRef.current.groundColor.setHex(0x271924);
      hemiLightRef.current.intensity = 0.8;
      ambLightRef.current.color.setHex(0x402538);
      ambLightRef.current.intensity = 0.6;
    }
  }, []);

  // Update wireframe property across all child meshes
  const toggleWireframeMode = useCallback((wireframe: boolean) => {
    if (!modelGroupRef.current) return;
    modelGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => {
            if (m && 'wireframe' in m) {
              (m as THREE.MeshStandardMaterial).wireframe = wireframe;
            }
          });
        } else if (mesh.material && 'wireframe' in mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).wireframe = wireframe;
        }
      }
    });
  }, []);

  // Initialize Three.js viewport
  useEffect(() => {
    if (!isWebGlSupported || !canvasContainerRef.current) {
      setIsLoading(false);
      return;
    }

    const container = canvasContainerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x161311);
    scene.fog = new THREE.FogExp2(0x161311, 0.015);
    sceneRef.current = scene;

    // 2. Camera
    const initialPos = monument.modelConfig?.defaultCameraPosition || [0, 6, 16];
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(initialPos[0], initialPos[1], initialPos[2]);
    cameraRef.current = camera;
    defaultCameraPosRef.current.set(initialPos[0], initialPos[1], initialPos[2]);

    // 3. Renderer with high DPI & soft shadows
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear previous canvas if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. OrbitControls with smooth damping
    const initialTarget = monument.modelConfig?.lookAtTarget || [0, 2.5, 0];
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Don't flip below ground
    controls.minDistance = monument.modelConfig?.minDistance || 2;
    controls.maxDistance = monument.modelConfig?.maxDistance || 50;
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = (monument.modelConfig?.autoRotateSpeed || 0.5) * 1.5;
    controls.target.set(initialTarget[0], initialTarget[1], initialTarget[2]);
    controlsRef.current = controls;
    defaultTargetRef.current.set(initialTarget[0], initialTarget[1], initialTarget[2]);

    // 5. Lights
    const hemiLight = new THREE.HemisphereLight(0xffdfba, 0x3a2e28, 1.0);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const ambLight = new THREE.AmbientLight(0x553e2e, 0.8);
    scene.add(ambLight);
    ambLightRef.current = ambLight;

    const dirLight = new THREE.DirectionalLight(0xffaa44, 2.4);
    dirLight.position.set(12, 18, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 80;
    const d = 15;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Apply active lighting preset
    applyLightingPreset(lightingMode);

    // 6. Architectural Pedestal Ground
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x12100e,
      roughness: 0.85,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // Subtle Concentric Coordinate Grid
    const grid = new THREE.GridHelper(40, 40, 0x78350f, 0x292524);
    grid.position.y = 0.01;
    scene.add(grid);

    // 7. Load GLB Model (If Provided by Backend) OR Procedural Architectural CAD Mesh
    setIsLoading(true);
    setLoadingProgress(0);

    const hasRemoteGlb = Boolean(monument.modelAvailable && modelUrl && modelUrl.trim().length > 0);

    if (hasRemoteGlb) {
      // Backend provided remote .glb
      const loader = new GLTFLoader();
      loader.load(
        modelUrl!,
        (gltf) => {
          const root = gltf.scene;
          modelGroupRef.current = root;

          // Auto-center and fit model bounding box
          const box = new THREE.Box3().setFromObject(root);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          root.position.x = -center.x;
          root.position.y = -box.min.y;
          root.position.z = -center.z;

          root.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
            }
          });

          scene.add(root);
          setIsCustomGlbLoaded(true);
          setIsLoading(false);
          setLoadingProgress(100);
        },
        (xhr) => {
          if (xhr.total > 0) {
            setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100));
          }
        },
        () => {
          // Fallback to procedural mesh if network/parse fails
          const fallbackMesh = createProceduralMonumentMesh(monument.id);
          modelGroupRef.current = fallbackMesh;
          scene.add(fallbackMesh);
          setIsCustomGlbLoaded(false);
          setIsLoading(false);
        }
      );
    } else {
      // Generate Procedural Architectural 3D Reconstruction
      const proceduralMesh = createProceduralMonumentMesh(monument.id);
      modelGroupRef.current = proceduralMesh;
      scene.add(proceduralMesh);
      setIsCustomGlbLoaded(false);

      setTimeout(() => {
        setIsLoading(false);
        setLoadingProgress(100);
      }, 250);
    }

    // 8. Render & Animation Loop
    const animate = () => {
      reqAnimFrameRef.current = requestAnimationFrame(animate);
      controls.update();

      // Project hotspots from 3D world coordinates to 2D screen pixels
      if (monument.hotspots && monument.hotspots.length > 0 && camera) {
        const widthHalf = (container.clientWidth || 800) / 2;
        const heightHalf = (container.clientHeight || 500) / 2;

        const projected = monument.hotspots.map((hotspot) => {
          const worldPos = new THREE.Vector3(
            hotspot.position[0],
            hotspot.position[1],
            hotspot.position[2]
          );

          if (modelGroupRef.current) {
            worldPos.add(modelGroupRef.current.position);
          }

          worldPos.project(camera);

          const isVisible = worldPos.z < 1;
          const screenX = worldPos.x * widthHalf + widthHalf;
          const screenY = -(worldPos.y * heightHalf) + heightHalf;

          return {
            hotspot,
            screenX,
            screenY,
            isVisible
          };
        });

        setProjectedHotspots(projected);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Listener
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqAnimFrameRef.current) {
        cancelAnimationFrame(reqAnimFrameRef.current);
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [monument, modelUrl, isWebGlSupported]);

  // Sync auto-rotation state with controls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
    }
  }, [isAutoRotating]);

  // Sync wireframe mode
  useEffect(() => {
    toggleWireframeMode(isWireframe);
  }, [isWireframe, toggleWireframeMode]);

  // Sync lighting mode
  useEffect(() => {
    applyLightingPreset(lightingMode);
  }, [lightingMode, applyLightingPreset]);

  // Reset Camera Vantage Point
  const handleResetCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.copy(defaultCameraPosRef.current);
    controlsRef.current.target.copy(defaultTargetRef.current);
    controlsRef.current.update();
  }, []);

  // Zoom In / Out
  const handleZoom = useCallback((delta: number) => {
    if (!cameraRef.current || !controlsRef.current) return;
    const camera = cameraRef.current;
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    camera.position.addScaledVector(forward, delta);
    controlsRef.current.update();
  }, []);

  // Hotspot Click: animate camera focus
  const handleHotspotClick = useCallback(
    (hotspot: HotspotAnnotation) => {
      if (onSelectHotspot) {
        onSelectHotspot(hotspot);
      }

      if (controlsRef.current && cameraRef.current) {
        const targetPos = hotspot.cameraTarget
          ? new THREE.Vector3(...hotspot.cameraTarget)
          : new THREE.Vector3(...hotspot.position);

        controlsRef.current.target.copy(targetPos);

        if (hotspot.cameraPosition) {
          cameraRef.current.position.set(...hotspot.cameraPosition);
        }
        controlsRef.current.update();
      }
    },
    [onSelectHotspot]
  );

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  }, []);

  // Listen to fullscreen exit via Escape key
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // WebGL Fallback if device does not support hardware acceleration
  if (!isWebGlSupported) {
    return (
      <div
        className={`relative w-full ${height} rounded-3xl overflow-hidden bg-stone-900 border border-parchment-800 p-8 flex flex-col items-center justify-center text-center space-y-4 text-white ${className}`}
      >
        <Landmark className="w-12 h-12 text-amber-400" />
        <h3 className="font-serif text-xl font-bold text-amber-100">WebGL Acceleration Required</h3>
        <p className="text-xs text-parchment-300 max-w-md">
          Your browser does not support hardware-accelerated 3D graphics. High-resolution 2D photographic plates and architectural schematics are available below.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`monument-3d-viewer-container relative w-full ${height} rounded-3xl overflow-hidden bg-[#161311] border border-parchment-800 shadow-heritage-xl text-white select-none ${className}`}
    >
      {/* 1. Canvas Injection Container */}
      <div ref={canvasContainerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 2. Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-[#161311]/90 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
            <Landmark className="w-7 h-7 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="space-y-1">
            <h4 className="font-serif text-lg font-bold text-amber-100">
              Streaming 3D Monument Spatial Mesh
            </h4>
            <p className="text-xs text-parchment-400 font-mono">
              {loadingProgress > 0 ? `${loadingProgress}% calibrated` : 'Initializing Three.js Shaders...'}
            </p>
          </div>
        </div>
      )}

      {/* 3. Projected 2D Hotspot Pins in 3D Space */}
      {!isLoading && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {projectedHotspots.map(({ hotspot, screenX, screenY, isVisible }, idx) => {
            if (!isVisible) return null;
            const isSelected = activeHotspotId === hotspot.id;

            return (
              <button
                key={hotspot.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleHotspotClick(hotspot);
                }}
                className={`absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 focus:outline-none group ${
                  isSelected ? 'scale-125 z-20' : 'hover:scale-115 z-10'
                }`}
                style={{ left: `${screenX}px`, top: `${screenY}px` }}
                aria-label={`Hotspot ${idx + 1}: ${hotspot.title}`}
              >
                <div className="relative flex items-center justify-center">
                  <span
                    className={`absolute w-8 h-8 rounded-full animate-ping opacity-75 ${
                      isSelected ? 'bg-amber-400' : 'bg-white/40'
                    }`}
                  />
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono shadow-heritage-md transition-colors ${
                      isSelected
                        ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-400/40'
                        : 'bg-white/95 text-stone-950 group-hover:bg-amber-300'
                    }`}
                  >
                    {idx + 1}
                  </div>
                </div>

                {/* Hotspot Floating Tooltip on Hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-stone-950/90 backdrop-blur-md border border-white/20 text-[11px] font-sans font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-heritage-sm">
                  {hotspot.title}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Top Header Information Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 pointer-events-none flex items-start justify-between gap-3">
        <div className="p-3 rounded-2xl bg-black/65 backdrop-blur-md border border-white/15 pointer-events-auto max-w-sm">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-widest text-amber-400 font-mono">
            <Sparkles className="w-3 h-3" />
            <span>
              {isCustomGlbLoaded 
                ? (t('monuments3D.photogrammetryModel') || '3D Photogrammetry Model')
                : (t('monuments3D.cadReconstruction') || '3D CAD Architectural Reconstruction')}
            </span>
          </div>
          <h2 className="font-serif text-sm sm:text-base font-bold text-white truncate">
            {monument.name}
          </h2>
          <div className="text-xs text-parchment-300">
            {monument.locationName || monument.district_or_city}, {monument.state}
          </div>
        </div>

        {/* Lighting Mode Selector Pills */}
        <div className="hidden sm:flex items-center gap-1 p-1 rounded-2xl bg-black/65 backdrop-blur-md border border-white/15 pointer-events-auto">
          {(
            [
              { id: 'golden-hour', label: t('monuments3D.goldenHour') || 'Golden Hour' },
              { id: 'museum-daylight', label: t('monuments3D.daylight') || 'Daylight' },
              { id: 'dusk', label: t('monuments3D.twilight') || 'Twilight' }
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => setLightingMode(m.id)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all ${
                lightingMode === m.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                  : 'text-parchment-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Bottom Interactive Controls Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none flex flex-wrap items-center justify-between gap-2">
        {/* Left Side: Orbit Tips */}
        <div className="px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/15 text-[11px] text-parchment-300 pointer-events-auto hidden md:flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>{t('monuments3D.dragToOrbit') || 'Drag to Orbit • Pinch/Scroll to Zoom • Shift+Drag to Pan'}</span>
        </div>

        {/* Right Side: Tactile Action Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/75 backdrop-blur-md border border-white/15 pointer-events-auto ml-auto">
          {/* Auto-Rotate Turntable Toggle */}
          <button
            onClick={() => setIsAutoRotating((prev) => !prev)}
            className={`p-2 rounded-xl transition-all ${
              isAutoRotating
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-parchment-300 hover:text-white hover:bg-white/10'
            }`}
            title={isAutoRotating ? (t('monuments3D.autoRotatePause') || 'Pause Turntable') : (t('monuments3D.autoRotatePlay') || 'Play 360° Turntable')}
            aria-label="Toggle auto rotate"
          >
            {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          {/* Wireframe Mode Toggle */}
          <button
            onClick={() => setIsWireframe((prev) => !prev)}
            className={`p-2 rounded-xl transition-all ${
              isWireframe
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'text-parchment-300 hover:text-white hover:bg-white/10'
            }`}
            title={t('monuments3D.wireframe') || 'Inspect Wireframe Geometry'}
            aria-label="Toggle wireframe mode"
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Zoom In */}
          <button
            onClick={() => handleZoom(1.5)}
            className="p-2 rounded-xl text-parchment-300 hover:text-white hover:bg-white/10 transition-all"
            title={t('monuments3D.zoomIn') || 'Zoom In'}
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => handleZoom(-1.5)}
            className="p-2 rounded-xl text-parchment-300 hover:text-white hover:bg-white/10 transition-all"
            title={t('monuments3D.zoomOut') || 'Zoom Out'}
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Reset Vantage Point */}
          <button
            onClick={handleResetCamera}
            className="p-2 rounded-xl text-parchment-300 hover:text-white hover:bg-white/10 transition-all"
            title={t('monuments3D.resetView') || 'Reset Camera Vantage Point'}
            aria-label="Reset camera"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl text-parchment-300 hover:text-white hover:bg-white/10 transition-all"
            title={t('monuments3D.fullscreen') || 'Fullscreen Mode'}
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
