import {Homescreen} from "./homescreen/homescreen";
import {Availability} from "./Availability";
import {NonProfitsDisplay} from "./results/nonProfitsDisplay";

function getGetParameters(): Map<string, string> {
  return new Map(//@ts-ignore
      window.location.href.split('?')[1]
          ?.split('&')
          .map(str => str.split('=').map(part => decodeURIComponent(part)))
      || []
  );
}

function App() {
  const params = getGetParameters();
  const categories = params.has('categories') ? JSON.parse(params.get('categories')!) : undefined;
  const availability = params.has('availability') ?
                       Availability.deserialize(params.get('availability')!) : undefined;
  
  if (params.get('page') === 'results' && availability && categories) {
    return (
        <NonProfitsDisplay availability={availability} categories={categories} />
    )
  } else {
    return (
        <Homescreen categories={categories} availability={availability} />
    )
  }
}

export default App
