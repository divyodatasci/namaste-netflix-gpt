import { BG_URL } from "../utils/constants";
// import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img className="" src={BG_URL} alt="logo" />
      </div>
      <div className='absolute -z-12 bg-gradient-to-b from-black w-full h-full'></div>
      <div className=" relative z-15">
        <GptSearchBar />
        {/* <GptMovieSuggestions /> */}
      </div>
    </>
  );
};
export default GPTSearch;