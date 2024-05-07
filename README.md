**Task README**

This project is a React component that displays a map using Leaflet library, along with dynamic information such as the current location of a driver, their distance and estimated time of arrival (ETA) to the next stop, and a list of predefined stops along the route.

### Approach

The main objective of this project is to provide a visual representation of a route with multiple stops and to track the location of a driver along that route. Here's how the project is structured and implemented:

1. **Setting up the Environment**:
   - React is used as the front-end framework.
   - Leaflet is employed for rendering the interactive map.
   - The project uses basic HTML and CSS for layout and styling.

2. **Map Rendering**:
   - Leaflet is initialized within a React component to render the map.
   - A set of predefined markers are added to the map to represent stops along the route.
   - The map tiles are sourced from OpenStreetMap.

3. **Driver Location Tracking**:
   - The `navigator.geolocation.getCurrentPosition` method is used to track the driver's current location.
   - The driver's location is updated at regular intervals using `setInterval`.
   - The distance and ETA to the next stop are calculated based on the driver's location and the location of the next stop.

4. **Displaying Information**:
   - The component renders information such as the next stop, ETA, and distance to the next stop.
   - This information is dynamically updated as the driver moves along the route.

### Setup Instructions

To set up and run the project locally, follow these steps:

1. Clone the repository to your local machine.

2. Navigate to the project directory.

3. Install dependencies by running:
   ```
   npm install
   ```

4. Make sure you have `Node.js` and `npm` installed on your machine.

5. Start the development server by running:
   ```
   npm start
   ```

6. Open your browser and go to `http://localhost:3000` to view the project.

