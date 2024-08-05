Inventory Managemer System
This is an inventory management system built with Next.js and Firebase. The application allows users to add, remove, and search for items in the inventory. by DaniNorth.

Live Demo Link
https://youtu.be/3TwMWsyiDo0

Features
Add new items to the inventory
Remove items from the inventory
Search for items using an autocomplete search bar
Responsive design with rounded borders and a background image

Technologies Used
Next.js
Firebase Firestore

Material-UI

Install the dependencies:
npm install
Create a Firebase project and set up Firestore. Add your Firebase configuration to a .env.local file in the root directory:
env

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
Run the development server:

npm run dev
Open your browser and navigate to http://localhost:3000.

Project Structure
lua

inventory-manager/
│
├── public/
│   └── pantry-background.jpeg
│
├── src/
│   ├── firebase.js
│   └── pages/
│       └── index.js
│
├── .env.local
├── .gitignore
├── package.json
├── README.md
└── next.config.js

Usage

Adding Items
Click the "Add New Item" button.
Enter the name of the item in the text field.
Click the "Add" button to add the item to the inventory.

Removing Items
Click the "Remove" button next to the item you want to remove.

Searching Items
Enter the name of the item in the search bar.
The inventory list will filter as you type.

Customization
Background Image
To change the background image, replace public/pantry-background.jpeg with your desired image and update the file path in the backgroundImage property in src/pages/index.js.

Styling
The project uses Material-UI for styling. You can customize the styles by modifying the sx prop or adding custom CSS classes.