'use strict';

////////////////// DOMAIN MODELS

class Workout {
  // private fields
  #id;

  // public interface
  distance;
  duration;
  coords;
  date;

  constructor({ id, distance, duration, coords, date }) {
    this.#id = id;
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
    this.date = new Date(date); // auto-convert from string or timestamp
  }

  get id() {
    return this.#id ?? null;
  }

  set id(value) {
    this.#id ??= value;
  }

  get type() {
    return null;
  }
}

class Running extends Workout {
  cadence;

  constructor({ id, distance, duration, coords, date, cadence }) {
    super({ id, distance, duration, coords, date });
    this.cadence = cadence;
  }

  get type() {
    return 'running';
  }

  get pace() {
    return this.cadence / this.duration;
  }
}

class Cycling extends Workout {
  elevationGain;

  constructor({ id, distance, duration, coords, date, elevationGain }) {
    super({ id, distance, duration, coords, date });
    this.elevationGain = elevationGain;
  }

  get type() {
    return 'cycling';
  }

  get speed() {
    return this.distance / this.duration;
  }
}

///////////////////// DOMAIN MODELS END

///////////////////// DATA LAYER

class WorkoutRepository {
  static #storageKey = 'workouts';

  list() {
    return this.#loadFromStorage();
  }

  add(workout) {
    console.log('Adding workout to repository', workout);

    const workouts = this.#loadFromStorage();

    workouts.push(workout);
    workout.id = workouts.length;

    this.#saveToStorage(workouts);

    console.log('Added workout to repository', workout);

    return workout;
  }

  // private area
  #loadFromStorage() {
    const workoutsString = localStorage.getItem(WorkoutRepository.#storageKey);
    console.log(`Persisted workouts are: ${workoutsString}`);

    const workouts = (JSON.parse(workoutsString) ?? []).map(obj =>
      this.#mapObjectToWorkout(),
    );

    console.log(`Deserialized workouts are:`, workouts);

    return workouts;
  }

  #mapObjectToWorkout(obj) {
    let workout = null;
    switch (obj.type) {
      case 'running':
        workout = new Running(obj);
        break;
      case `cycling`:
        workout = new Cycling(obj);
        break;
    }
  }

  #saveToStorage(workouts) {
    localStorage.setItem(
      WorkoutRepository.#storageKey,
      JSON.stringify(workouts),
    );
  }
}

///////////// DATA LAYER END

///////////// BUSINESS LOGIC LAYER

class WorkoutService {
  #repository;

  constructor(workoutRepository) {
    this.#repository = workoutRepository;
  }
  logWorkout(workout) {
    // check if we're actually saving workouts
    if (!(workout instanceof Workout)) return;

    this.#repository.add(workout);
  }

  getAllWorkouts() {
    // return shallow copy to avoid changes in internal log
    return this.#repository.list();
  }
}

///////////////////// BUSINESS LOGIC END

///////////////////// PRESENTATION LAYER
class AppViewModel {
  workouts = [];
  selectedCoords = null;
}

class AppView {
  #form = document.querySelector('.form');
  #containerWorkouts = document.querySelector('.workouts');
  #inputType = document.querySelector('.form__input--type');
  #inputDistance = document.querySelector('.form__input--distance');
  #inputDuration = document.querySelector('.form__input--duration');
  #inputCadence = document.querySelector('.form__input--cadence');
  #inputElevation = document.querySelector('.form__input--elevation');
  #map;
  #mapMarkersLayer;

  static #months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor() {
    this.#map = L.map('map');

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#mapMarkersLayer = L.layerGroup().addTo(this.#map);
  }

  addListenerOnMapClick(callback) {
    this.#map.on('click', callback);
    return this;
  }

  addListenerOnWorkoutSubmit(callback) {
    this.#form.addEventListener('submit', callback);
    return this;
  }

  showCurrentPosition({ latitude, longitude }) {
    this.#map.setView([latitude, longitude], 13);
  }

  showNewWorkoutForm() {
    this.#inputDistance.value =
      this.#inputDuration.value =
      this.#inputCadence.value =
      this.#inputElevation.value =
        '';

    this.#form.classList.remove('hidden');
    this.#inputDistance.focus();
  }

  hideNewWorkoutForm() {
    this.#form.classList.add('hidden');
  }

  switchNewWorkoutFormToRunning() {
    this.#inputCadence
      .closest('.form__row--hidden')
      .classList.remove('form__row--hidden');

    this.#inputElevation
      .closest('.form__row--hidden')
      .classList.add('form__row--hidden');
  }

  switchNewWorkoutFormToCycling() {
    this.#inputCadence
      .closest('.form__row--hidden')
      .classList.add('form__row--hidden');
    this.#inputElevation
      .closest('.form__row--hidden')
      .classList.remove('form__row--hidden');
  }

  showWorkout(workout) {
    L.marker(mapEvent.latlng)
      .addTo(map)
      .bindPopup(
        L.popup({
          minWidth: 100,
          maxWidth: 250,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        }),
      )
      .setPopupContent(this.#stringifyWorkout(workout))
      .openPopup();
  }

  #handleWorkoutSubmit(e) {
    if (this.onWorkoutSubmit instanceof Function) {
      this.onWorkoutSubmit(workout);
    }
  }

  #mapWorkoutFromView() {
    return this.#inputType === 'running'
      ? new Running(
          null,
          this.#inputDistance.value,
          this.#inputDuration.value,
          this.#inputCadence.value,
        )
      : new Cycling(
          null,
          this.#inputDistance.value,
          this.#inputDuration.value,
          this.#inputElevation.value,
        );
  }

  #stringifyWorkout(workout) {
    return 'Workout';
  }
}

class AppController {
  // do not use constructor argument to ensure the type is known
  #workoutService;
  #viewModel = new AppViewModel();
  #view = new AppView();

  constructor(workoutService) {
    this.#workoutService = workoutService;
  }

  run() {
    this.#startCurrentPositionDetection();

    // listen to view events
    this.#view
      .addListenerOnMapClick(this.#onNewLocation.bind(this))
      .addListenerOnWorkoutSubmit(this.#onNewWorkoutSubmit.bind(this));

    // construct view model
    this.#viewModel.workouts = this.#workoutService.getAllWorkouts();
  }

  // private methods area
  #startCurrentPositionDetection() {
    console.log('Starting to get current position...');
    navigator.geolocation?.getCurrentPosition(
      this.#onGeoPositionObtained.bind(this),
      this.#onGeoPositionError.bind(this),
    );
  }

  #onGeoPositionObtained(position) {
    console.log(`Geo-position obtained`, position.coords);
    this.#view.showCurrentPosition(position.coords);
  }

  #onGeoPositionError() {
    alert('Position error!');
  }

  #onNewLocation(e) {
    console.log('New location selected', e);
    this.#viewModel.selectedCoords = {
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    };
    console.log(this.#viewModel);

    this.#view.showNewWorkoutForm();
  }

  #onNewWorkoutSubmit(e) {
    console.log('On new workout submit', e);

    e.preventDefault();

    // get form data
    const formElement = e.target.closest('form');
    const formData = new FormData(formElement);
    const formObject = Object.fromEntries(formData);

    // map workout from formObject
    console.log(formObject);

    // show new workout point

    // persist workout
  }
}

// PRESENTATION LAYER END

const app = new AppController(new WorkoutService(new WorkoutRepository()));
app.run();
