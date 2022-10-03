import React from "react";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

export const Searcher = ({handleSubmit}) => {
  const [searchText, setSearchText] = useState("");
 

  return (
    <form className="search-box" onSubmit={(e) => handleSubmit(e,searchText)} value={searchText}>
      <button className="btn-search">
        <BiSearchAlt className="btn-search" />
      </button>
      <input type="text" value={searchText} className="input-search" placeholder="Bulbasaur..." onBlur={()=>setSearchText("")} onChange={(e)=>setSearchText(e.target.value.toLowerCase())}/>
    </form>
    // <form classNameName="buscador" onSubmit={(e)=>handleSubmit(e)}><input type="text" value={searchText} onChange={(e)=> setSearchText(e.target.value.toLowerCase())}></input><BiSearchAlt classNameName='icon'/></form>
  );
};
