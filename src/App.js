import './App.css';
import Select from 'react-select';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';





/* #################################
   ######## Header Content #########
   #################################
*/
function Header(props) {
    return (
        <header className="App-header">
            <div>Top Bar</div>
        </header>
    )
}






/* #################################
   ####### Main App Content ########
   #################################
*/
function MainContent(props){
    return(
        <div className="Main-Content">

            <div>Content</div>
            {/* <h2>  {props.name} </h2> */}
            <Calculator name="." vehicleChoices={vehicleChoices}/>

        </div>


    )
}




async function getData(url) {
    try{

        // let response = await fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/440?format=json");
        let response = await fetch(url);

        if (!response.ok) {
            let message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        // console.log("RESPONSE: ", response);
        let json = await response.json();

        // console.log("JSON result: ", json);
    }
    catch(error){
        if(error.toString().includes("Failed to fetch"))
            // alert("Failed to receive a response from the the database.")
        console.log("ERROR: ", error);
    }
    // How to get EV data? Can't request from NHTSA bc no filter, may have to hardcode it?
}


// First, get the vehicle model, and the location of user (State)


/*

Pull State Data from
    All fuels: http://api.eia.gov/series/?api_key=YOUR_API_KEY_HERE&series_id=ELEC.GEN.ALL-US-1.A
    Coal Annually: http://api.eia.gov/series/?api_key=YOUR_API_KEY_HERE&series_id=ELEC.GEN.COW-US-1.A
    Liquid Petroleum: http://api.eia.gov/series/?api_key=YOUR_API_KEY_HERE&series_id=ELEC.GEN.PEL-US-1.A
    Petcoke: http://api.eia.gov/series/?api_key=YOUR_API_KEY_HERE&series_id=ELEC.GEN.PC-US-1.A
    Natural gas: http://api.eia.gov/series/?api_key=YOUR_API_KEY_HERE&series_id=ELEC.GEN.NG-US-1.A
    Nuclear: http://api.eia.gov/series/?api_key=YOUR_API_KEY_HERE&series_id=ELEC.GEN.NUC-US-1.A
    Convent. hydro: http://api.eia.gov/series/?api_key=YOUR_API_KEY_HERE&series_id=ELEC.GEN.HYC-US-1.A
    Other renewables: http://api.eia.gov/series/?api_key=YOUR_API_KEY_HERE&series_id=ELEC.GEN.AOR-US-1.A
    Pump hydro (neg): http://api.eia.gov/series/?api_key=YOUR_API_KEY_HERE&series_id=ELEC.GEN.HPS-US-1.A
    Other: http://api.eia.gov/series/?api_key=YOUR_API_KEY_HERE&series_id=ELEC.GEN.OTH-US-1.A


    // Compare to total number and get vals





*/

getData("https://api.eia.gov/series/?api_key=df1c2e896a9338ec18c65bf62aa77132&series_id=ELEC.PRICE.NM-RES.M")


/* #################################
   ####### Functional Content #######
   #################################
*/

var vehicleChoices = [
    "Audi E-tron",
    "Chevrolet Bolt",
    "Tesla Model S",
    "Rivian R1T"
];



var optionsMaker = function(arr) {
    var optionsList = [];
    for(var i = 0; i < arr.length; i++){
        optionsList.push(
            {
                value: arr[i],
                label: arr[i].toString()
            }
        )
    }
    return optionsList;
}

var stateOptionsMaker = function(arr) {
    var optionsList = [];
    for(var i = 0; i < arr.length; i++){
        optionsList.push(
            {
                value: arr[i].substr(0,2),
                label: arr[i].substr(5, arr[i].length)
            }
        )
    }
    return optionsList;
}

var statesList =
[   "AK - Alaska",
    "AL - Alabama",
    "AR - Arkansas",
    "AS - American Samoa",
    "AZ - Arizona",
    "CA - California",
    "CO - Colorado",
    "CT - Connecticut",
    "DC - District of Columbia",
    "DE - Delaware",
    "FL - Florida",
    "GA - Georgia",
    "GU - Guam",
    "HI - Hawaii",
    "IA - Iowa",
    "ID - Idaho",
    "IL - Illinois",
    "IN - Indiana",
    "KS - Kansas",
    "KY - Kentucky",
    "LA - Louisiana",
    "MA - Massachusetts",
    "MD - Maryland",
    "ME - Maine",
    "MI - Michigan",
    "MN - Minnesota",
    "MO - Missouri",
    "MS - Mississippi",
    "MT - Montana",
    "NC - North Carolina",
    "ND - North Dakota",
    "NE - Nebraska",
    "NH - New Hampshire",
    "NJ - New Jersey",
    "NM - New Mexico",
    "NV - Nevada",
    "NY - New York",
    "OH - Ohio",
    "OK - Oklahoma",
    "OR - Oregon",
    "PA - Pennsylvania",
    "PR - Puerto Rico",
    "RI - Rhode Island",
    "SC - South Carolina",
    "SD - South Dakota",
    "TN - Tennessee",
    "TX - Texas",
    "UT - Utah",
    "VA - Virginia",
    "VI - Virgin Islands",
    "VT - Vermont",
    "WA - Washington",
    "WI - Wisconsin",
    "WV - West Virginia",
    "WY - Wyoming"]


let x = function() {alert("hey dude")}

function Calculator(props) {
    return(
        <div className="Calculator">
            <form id="main-choices">

                {/* This works */}
                {/* <ul>    {props.vehicleChoices.map((vehicle) => <li>{vehicle}</li>)}     </ul> */}

                {/* <Select options={props.vehicleChoices.map( (vehicle) => console.log(vehicle) )}/> */}
                <h4>  Select your vehicle</h4>
                <Select options={optionsMaker(vehicleChoices)}/>
                <br/>
                <br/>
                <h4>  Select your state</h4>
                <Select options={stateOptionsMaker(statesList)}/>

                {/* Won't accept just alert(), have to wrap it in an anonymous function */}
                <Button variant="dark" size="lg" onClick={ () => alert("Hey buddy, onClick is working") } >Generate report</Button>{' '}

            </form>

        </div>
    )
}










/* #################################
   ######## Footer Content #########
   #################################
*/
function AppFooter(props){
    return(
        <div className="App-Footer" >
            <footer> Copyright {props.currentYear} </footer>
        </div>
    )
}


function App() {
    return (
        <div className="App">

            <Header />

            <MainContent />

            <AppFooter currentYear={new Date().getFullYear()} />

        </div>
    );
}

export default App;
