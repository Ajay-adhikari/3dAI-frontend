import React, { useState, useEffect } from "react";
import { AnimatePresence ,motion} from "framer-motion";
import { useSnapshot } from "valtio";
import batman from '../assets/batman.webp'
import building from '../assets/buildings.jpg'
import car from '../assets/car.webp'
import dinasaur from '../assets/dinasaur.webp'
import dogandcat from '../assets/dog and cat.png'
import girl from '../assets/girl.png'
import goku from '../assets/goku.webp'
import hulk from '../assets/hulk.png'
import manwithgun from '../assets/manwithgun.png'
import manwithguncar from '../assets/manwithguncar.png'
import ronaldo from '../assets/ronaldo.webp'




import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { ColorPicker, CustomButton, AIpicker, FilePicker, Tab } from "../components";

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  })

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />
      case "aipicker":
        return <AIpicker 
          prompt={prompt}
          setPrompt={setPrompt}
          // generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      default:
        return null;
    }
  }

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");

    try {
      // setGeneratingImg(true);
      console.log(prompt)
      // const response = await fetch('http://localhost:8080/api/v1/dalle', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     prompt,
      //   })
      // })

      // const data = await response.json();
      if(prompt=='car')    {   handleDecals(type, car)}
      else if(prompt=='batman')    {   handleDecals(type, batman)}
      else if(prompt=='building of usa')    {   handleDecals(type, building)}
      else if(prompt=='futurecar')    {   handleDecals(type, car)}
      else if(prompt=='liondog')    {   handleDecals(type, dogandcat)}
      else if(prompt=='goku')    {   handleDecals(type, goku)}
      else if(prompt=='spider and hulk')    {   handleDecals(type, hulk)}
      else if(prompt=='man with gun')    {   handleDecals(type, manwithgun)}
      else if(prompt=='man with gun and car')    {   handleDecals(type, manwithguncar)}
      else if(prompt=='ronaldo')    {   handleDecals(type, ronaldo)}
      else if(prompt=='dinasaur')    {   handleDecals(type, dinasaur)}
      else if(prompt=='girl')    {   handleDecals(type, girl)}
      
      
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}>
             <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}

              
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton 
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
            <CustomButton 
              type="filled"
              title="Buy It"
              handleClick={() => state.intro = false}
              customStyles="w-fit px-4 m-2 py-2.5 font-bold text-sm"
            />
            <CustomButton 
              type="filled"
              title="Add to Cart"
              handleClick={() => state.intro = false}
              customStyles="w-fit px-4 m-2 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
          className="filtertabs-container"
          {...slideAnimation('up')}

          >
            {FilterTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab=""
                    
                    handleClick={() => {}}
                  />
                ))}
          </motion.div>
        </>
        
      )}
      
    </AnimatePresence>
    
  );
};

export default Customizer;
