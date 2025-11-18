import { useContext, useEffect, useRef, useState } from "react"
import { skills } from "../../assets/contents"
import { AvailableSkillCategories, SkillCategorie} from "../../assets/dataTypes"
import styles from "../../style"
import { skillCategories } from "../../assets/constants"
import { ThemeContext } from "../theme/ThemeEngine"

type GraphData = {
  nodes: {id: string, name: string, img: string, val: number, group: SkillCategorie}[];
  links: {source: string, target: string}[];
}

const Skills = () => {
//   const { currentTheme } = useContext(ThemeContext)
//   const [selectedCategory, setSelectedCategory] = useState(AvailableSkillCategories.LANGUAGE)
//   const [graphData, setGraphData] = useState<GraphData>()
//   const graph = useRef<ForceGraphMethods$1<{ id: string; name: string; img: string; val: number; group: SkillCategorie; }, { source: string; target: string }> | undefined>(undefined)
//   const distance = 500
  
//   useEffect(() => {
//     const initGraphData: GraphData = {nodes: [], links: []}

//     skills//.filter((skill) => skill.category.context === selectedCategory)
//     .sort((a) => a.framework ? -1 : 1)
//     .sort((a,b) => a.framework === b.framework ? -1 : 1)
//     .map((skill, _index, all) => {
//       initGraphData.nodes.push({
//         id: skill.label,
//         name: skill.label,
//         img: skill.icon.content[currentTheme],
//         val: skill.weight ?? 1,
//         group: skill.category!
//       })

//       const verifiedTarget = (
//         initGraphData.links.find((l) => l.target === skill.label) ? null 
//         : skill.framework ? all.find((s) => s.label === skill.framework)
//         : all.find((s) => 
//           s.subcategory === skill.subcategory 
//           && !s.framework
//           && s.label !== skill.label
//         ) ?? null
//       )
//       if (verifiedTarget !== null) {
//         initGraphData.links.push({
//           source: skill.label,
//           target: verifiedTarget!.label
//         })
//       }

//       setGraphData(initGraphData)
//     })
//   }, [selectedCategory])

//   useEffect(() => {
//     graph.current?.cameraPosition({ z: distance });

//     let angle = 0;
//     setInterval(() => {
//       graph.current?.cameraPosition({
//         x: distance * Math.sin(angle),
//         z: distance * Math.cos(angle)
//       });
//       angle += Math.PI / 300;
//     }, 10);
//   }, []);


//   return (
//     <section id="skills"
//       className=
//       {`
//         ${styles.sizeFull}
//         ${styles.flexCol}
//         ${styles.contentCenter}
//       `}
//     >
//       <div id="section-controls"
//         className=
//         {`
//           ${styles.flexRow}
//           w-full
//           h-fit        
//         `}
//       >
//         {skillCategories.map((categorie) => (
//           <button key={`${categorie}`}
//             className=
//             {`
//               ${selectedCategory === categorie.context ? "text-(--color-tertiary)" : ""}
//               hover:text-(--color-tertiary)
//             `}
//             onClick={() => setSelectedCategory(categorie.context)}
//           > {categorie.content['fr']} </button>
          
//         ))}
//         {selectedCategory}
//       </div>

//       <div id="graph-container"
//         className=
//         {`
//           ${styles.sizeFull}
//           ${styles.flexCol}
//           ${styles.contentCenter}
//           border-red-500
//           border-2
//         `}
//       >
//         <ForceGraph2D //ref={graph}
//           graphData={graphData}
//           backgroundColor={
//             getComputedStyle(document.documentElement)
//             .getPropertyValue("--color-primary")
//           }
//           width={document.querySelector("#graph-container")?.clientWidth ?? 0}
//           height={ document.querySelector("#graph-container")?.clientHeight ?? 0}
//           enableNodeDrag={false}
//           enableZoomInteraction={false}
//           enablePointerInteraction={true}
          
//           //showNavInfo={false}
//           //enableNavigationControls={true}
          
//           nodeCanvasObject={(node) => {
//             const imgTexture = new TextureLoader().load(node.img);
//             imgTexture.colorSpace = SRGBColorSpace;
//             const material = new SpriteMaterial({ map: imgTexture });
//             const sprite = new Sprite(material);
//             sprite.scale.set(24, 24, 1);
//             return sprite;
//           }}
//           // nodeThreeObject={({ img }) => {
//           //     const imgTexture = new TextureLoader().load(img);
//           //     imgTexture.colorSpace = SRGBColorSpace;
//           //     const material = new SpriteMaterial({ map: imgTexture });
//           //     const sprite = new Sprite(material);
//           //     sprite.scale.set(24, 24, 1);
//           //     return sprite;
//           // }}
//           nodeLabel={(node) => `${node.name}`}
//           nodeVal={(node) => node.val}
//           nodeRelSize={5}
//           //nodeResolution={10}

//           linkColor={() =>
//             getComputedStyle(document.documentElement)
//             .getPropertyValue("--color-tertiary")
//           }
//           linkVisibility={true}
//           linkLabel={"bonjour"}
//           linkWidth={1}
//           //linkOpacity={0.5}
//           //linkResolution={10}

//           linkDirectionalParticles={1}
//           linkDirectionalParticleSpeed={0.001}
//           linkDirectionalParticleWidth={0.8}
          
//           onEngineStop={() => graph.current?.zoomToFit(400, 400)}
//         />
//       </div>
//     </section>
//   )  
}

export default Skills
