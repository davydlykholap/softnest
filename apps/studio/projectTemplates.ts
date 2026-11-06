import type { Template } from "sanity";

export const projectInCityTemplate: Template = {
  id:"project-in-city",
  title:"Project in this city",
  schemaType:"cleaningProject",
  parameters:[{name:"cityId",title:"City",type:"string"}],
  value:({cityId}:{cityId?:string}) => {
    if(!cityId) throw new Error("Choose a city in Our Work → Projects by city first.");
    return { locations:[{_key:"city",_type:"reference",_ref:cityId}], publicationStatus:"pending", variant:"single" };
  },
};
