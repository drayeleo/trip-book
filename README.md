# TRIP BOOK README

# Background

This app was inspired while backpacking through the Reserva Cotacachi Cayapas, a rugged and mountainous area of protected land in the Ecuadorian Andes, in 2019. The trip was a milestone for myself as an outdoorsman - because of the somewhat undocumented nature of the Ecuadorian parks & trails system, I found myself mostly navigating the wilderness with paper topographic maps I had acquired from the Ecuadorian Institute of Military Geography. The experience of mentally abstracting the flat contour lines on the map into 3 dimensions and then overlaying them onto the craggy peaks and lush valleys around me in my mind's eye had a profound impact on the way I viewed the landscapes I travelled through. I found myself wanting a way to preserve that perspective and revisit it - and so I had the idea for an app that would take the geotagged photos I was snapping, pin them to locations on a digital topographic map, and allow the side-by-side visualization of the terrain through topographic contour lines as well as images. I wasn't able to realize this dream until 2022 when I used newly acquired skills in full stack web development to create exactly the app I had dreamed of. This is Trip Book.

# Using the App

This app was designed using Google Chrome version 103.0 and will function best when tested in the same environment.

The app requires creation of a user account, after which you'll be prompted to enter a name and description to create a new trip, then redirected to the "view trip" page. Because no photos have been uploaded yet, the map will be centered on the United States.

To upload photos, click on the "Edit Trip" button and choose image files to upload. You're welcome to upload your own geotagged photos, or use some photos that I've saved [here](https://capstone-sample-photos.s3.us-west-1.amazonaws.com/yanaurco_photos.zip) (a .zip folder will auto-download from that link). Simply click the upload button, select the photos you wish to upload, and then click the "Submit" button. The photos will be saved to the server and then the site will redirect back to the "trip" page.

On the "Trip" page, you should now see markers and/or marker clusters indicating the locations of the photos you just uploaded. Click around, and see if you can recognize the features in the photos on the map! Try changing the map background as well to see how different layers reveal different features.

# How it works

This app uses a React.js front end and a Ruby on Rails back end. Rails Active Record is used to save user data to a Postgres database, including:

- username
- password (protected with [bcrypt](https://www.npmjs.com/package/bcrypt))
- trips (belongs_to a user)
- locations (belongs_to a trip)

## Image Upload

The images are uploaded to the front end using a typical multiple-image upload input, and are saved to a formData object prior to being uploaded to S3 storage on the back end.

## Extracting Coordinates from Images

Image files are generally created with an EXIF (Exchangeable Image File Format) file attached which contains information about the camera settings used to capture the image. Smartphones (and other photographic devices with location tracking ability) are capable of saving geotag data in EXIF files so that the location where the photo was taken is recorded. For Trip Book, I used the [exifr](https://www.npmjs.com/package/exifr) library to read the coordinates of each photo upon upload, and save these to the database for easy access. Nested asynchronous functions were used to read coordinates from a batch of multiple images uploaded simultaneously.

## Image Storage

Image storage is achieved using Rails' [ActiveStorage](https://edgeguides.rubyonrails.org/active_storage_overview.html) tool to attach images to "location" records so that each location has a single image attached. The cloud storage service used for this app is Amazon S3. Because images are saved in batches, a custom `add_locations` function was written in `trips_controller.rb`.

Code snippets and a walkthrough of image storage are provided in my blog post [here](https://dev.to/drayeleo/storing-multiple-image-files-in-amazon-s3-using-rails-active-storage-and-reactjs-3pi5).

## The Map

The map display for each trip is created using the [leaflet](https://leafletjs.com/) and [react-leaflet](https://react-leaflet.js.org/) libraries to create the map container and markers, and the [@changey update](https://www.npmjs.com/package/@changey/react-leaflet-markercluster) to an older [react-leaflet-markercluster](https://www.npmjs.com/package/react-leaflet-markercluster). Basemap tiles are sourced from Google Maps and OpenStreetMap.
