## boilerplate webpack setup

### start development server:

- `npm install -d` 
- `npm start`
- Yay! Development server is runnning: go to http://localhost:3000
- Try editing files (in `site/`) while development server is running -- you can see it change before your eyes!

### notes on structure

- web files are in `app/`
- `app/main.js` loads all javascript & css
- build directory is set in `config/webpack.common.config.js`

### to deploy:

- `npm run preview`
- All files are now in `dist/`. http://localhost:3000 previews built files.

- `npm run build`
- All files are built in `dist`. Push this to your production web server. 

