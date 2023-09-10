// Personal comment convention:
// when its a normal comment, space after: "// text"
// When its a temporarily disabled line of code, no space after: "//text"

// I am not wanting to make this resource heavy or have numerous api requests per minute
// Designed to just grab API data at time of refresh, and display it 

// Select the div elements to fill
const refreshedTimeElement = document.getElementById('refreshedTime')

// API URL
const apiUrl = 'https://api.warframestat.us/ps4';

// Fetch data from API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    
    // Get the current time
    const currentDate = new Date();
    const currentTimeString = currentDate.toLocaleTimeString(); // Returns a string in the format "hh:mm:ss AM/PM"
    refreshedTimeElement.textContent = "Refreshed:".concat(currentTimeString );
    
    const divOpenWorld = document.createElement("div");
    divOpenWorld.setAttribute("id", "OpenWorld");
    //divOpenWorld.classList("crystalFG");
    divOpenWorld.appendChild(document.createTextNode( "OpenWorlds:" ));
    //divOpenWorld.appendChild(document.createTextNode( cycle ));
    divOpenWorld.appendChild(document.createElement("br"));
    // cetusCycle 
    divOpenWorld.appendChild(document.createTextNode( "Cetus | ".concat(data.cetusCycle.state, " | ", data.cetusCycle.timeLeft) ));
    divOpenWorld.appendChild(document.createElement("br"));
    // cambionCycle 
    divOpenWorld.appendChild(document.createTextNode( "Cambion | ".concat(data.cambionCycle.state, " | ", data.cambionCycle.timeLeft) ));
    divOpenWorld.appendChild(document.createElement("br"));
    // zarimanCycle 
    divOpenWorld.appendChild(document.createTextNode( "Zariman | ".concat(data.zarimanCycle.state, " | ", data.zarimanCycle.timeLeft) ));
    divOpenWorld.appendChild(document.createElement("br"));
    // vallisCycle 
    divOpenWorld.appendChild(document.createTextNode( "Vallis | ".concat(data.vallisCycle.state, " | ", data.vallisCycle.timeLeft) ));
    divOpenWorld.appendChild(document.createElement("br"));
    // duviriCycle 
    console.log( "currentDate:         ".concat( currentDate.toISOString() ) );
    console.log( "new Date:            ".concat( new Date().toISOString() ) );
    console.log( "timestamp:           ".concat( data.timestamp ) );
    console.log( "duviriCycle.expiry:  ".concat( data.duviriCycle.expiry ) );
    diffString = dateDifference( new Date( data.duviriCycle.expiry ) , new Date ( data.timestamp ) ); 
    console.log( "Difference:          ".concat( diffString ) );
    divOpenWorld.appendChild(document.createTextNode( "Duviri | ".concat( data.duviriCycle.state, " | ", diffString ) )); // There is no data.duviriCycle.timeLeft, had to compute... 
    divOpenWorld.appendChild(document.createElement("br"));
    // nightwave
    const divNightwave = document.createElement("div");
    divNightwave.appendChild(document.createTextNode( "Nightwave:"));
    divNightwave.appendChild(document.createElement("br"));
    // .activeChallenges[]: isDaily isElite desc reputation title
    data.nightwave.activeChallenges.forEach(challenge => {
      const paraNightwave = document.createElement("p");
      paraNightwave.appendChild( document.createTextNode(  challenge.title.concat( " | ", challenge.reputation ) ) );
      paraNightwave.appendChild(document.createElement("br"));
      paraNightwave.appendChild( document.createTextNode ( challenge.desc ));
      paraNightwave.appendChild(document.createElement("br"));
      divNightwave.appendChild( paraNightwave );
    });

    // may change these paragraphs to divs, then each variant gets a paragraph
    // sortie title: 
    const divSortie = document.createElement("div");
    divSortie.appendChild(document.createTextNode( "Sortie: " ));
    divSortie.appendChild(document.createElement("br"));
    divSortie.appendChild(document.createTextNode( data.sortie.boss.concat( " | ", data.sortie.eta) )); // data.sortie.boss | data.sortie.eta
    
    // data.sortie.variants[0-2] .missionType sortie.variants[0].modifier sortie.variants[0].node
    data.sortie.variants.forEach(variant => {
      const paraSortie = document.createElement("p");
      paraSortie.appendChild( document.createTextNode(  variant.node.concat( " | ", variant.missionType ) ) );
      paraSortie.appendChild(document.createElement("br"));
      paraSortie.appendChild( document.createTextNode(variant.modifier) );
      divSortie.appendChild( paraSortie );
    });
    
    // archonHunt:
    const divArchon = document.createElement("div");
    // data.archonHunt.boss | data.archonHunt.eta
    divArchon.appendChild(document.createTextNode( data.archonHunt.boss.concat( " | ", data.archonHunt.eta ) ));
    // data.archonHunt.missions[0, 1, 2] .node .type
    data.archonHunt.missions.forEach(mission => {
      const paraArchon = document.createElement("p");
      paraArchon.appendChild( document.createTextNode(  mission.node.concat( " | ", mission.type ) ) );
      divArchon.appendChild( paraArchon );
    });
    
    // data.voidTrader: 
    const divBaro = document.createElement("div");
    // data.voidTrader: character | location
    divBaro.appendChild(document.createTextNode( data.voidTrader.character.concat( " | ", data.voidTrader.location ) ) )
    divBaro.appendChild(document.createElement("br"));
    // data.voidTrader.inventory:
    data.voidTrader.inventory.forEach( i => {
      divBaro.appendChild( document.createTextNode(  i.item ) );
      divBaro.appendChild(document.createElement("br"));
    });
    divBaro.appendChild(document.createElement("br"));
    
    // data.vaultTrader:
    const divVault = document.createElement("div");
    // data.vaultTrader.location:
    divVault.appendChild(document.createTextNode( data.vaultTrader.location ) )
    divVault.appendChild(document.createElement("br"));
    // data.vaultTrader.inventory:
    data.vaultTrader.inventory.forEach( i => {
      divVault.appendChild( document.createTextNode( i.item ) );
      divVault.appendChild(document.createElement("br"));
    });
    divVault.appendChild(document.createElement("br"));

    // event descriptions
    const divEvents = document.createElement("div");
    divEvents.appendChild(document.createTextNode( "Events" ) )
    divEvents.appendChild(document.createElement("br"));
    // data.events[].description
    data.events.forEach( event => {
      divEvents.appendChild( document.createTextNode( event.description ) );
      divEvents.appendChild(document.createElement("br"));
    });

    const cyclesElement = document.getElementById("warframeCycles");

    divOpenWorld.classList.add("crystalFG");
    divEvents.classList.add("crystalFG");
    divNightwave.classList.add("crystalFG");
    divSortie.classList.add("crystalFG");
    divArchon.classList.add("crystalFG");
    divBaro.classList.add("crystalFG");
    divVault.classList.add("crystalFG");

    cyclesElement.appendChild( divOpenWorld );
    cyclesElement.appendChild( divEvents );
    cyclesElement.appendChild( divNightwave );
    cyclesElement.appendChild( divSortie );
    cyclesElement.appendChild( divArchon );
    cyclesElement.appendChild( divBaro );
    cyclesElement.appendChild( divVault );
            
    // }
    // Add link to https://hub.warframestat.us/poe/map
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

function dateDifference( dateOne, dateTwo ){
  const timeDifferenceMs = dateOne.getTime() - dateTwo.getTime(); 
  console.log( "Difference in ms:    ".concat( timeDifferenceMs ) );
  // Calculate days, hours, minutes, and seconds from the time difference
  const dSeconds = Math.floor(timeDifferenceMs / 1000) % 60;
  const dMinutes = Math.floor(timeDifferenceMs / (1000 * 60)) % 60;
  const dHours = Math.floor(timeDifferenceMs / (1000 * 60 * 60)) % 24;
  const dDays = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
  let diffString = "";
  if( dDays > 0){
    diffString = diffString.concat( dDays, "d " )
  }
  if( dHours > 0 ){
    diffString = diffString.concat( dHours, "h " )
  }
  if( dMinutes > 0){
    diffString = diffString.concat( dMinutes, "m " )
  }
  diffString = diffString.concat( dSeconds, "s " )
    
  return diffString;
}