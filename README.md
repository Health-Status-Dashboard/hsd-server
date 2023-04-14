# Health Status Dashboard Backend
This repo contains code for the Health Status Dashboard backend.

Run `npm start` to run the server. It will run on localhost:3000.

## This server connects with a MongoDB instance to get and serve data.
### MongoDB Community setup:
1. Follow the instructions to install Mongo at https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/ (macOS)
2. If you get errors running mongo, or `brew services list` displays a mongo error, use the fix at: https://www.mongodb.com/community/forums/t/help-brew-mongodb-community-5-0-error-macos/125648


### Models
The models folder contains the [schemas](https://mongoosejs.com/docs/typescript/schemas.html), data models, and behaviors for different types of data. If need be, models can have [both](https://mongoosejs.com/docs/typescript/statics-and-methods.html) methods and statics. The [schemas](https://github.com/Health-Status-Dashboard/hsd-server/tree/main/src/schemas) used in the backend reflect how the data will be used the frontend to visualize the data, rather than having specific schemas for each type of data originally drawn from APIs. [Models](https://github.com/Health-Status-Dashboard/hsd-server/tree/main/src/models) are, however, specific to each data source, so data can be independently manipulated if need be. 

### Routes
The routes are meant to be specific to data models to keep a maintainable codebase. Each model has associated functions that can be accessed via these routes to manipulate requisite data.

### Data Sources

Data is drawn from the following sources:

* [CDC](https://data.cdc.gov/) - including [chronic indicators](https://chronicdata.cdc.gov/)
* [US Census](https://api.census.gov)


## License

Copyright 2023 The MITRE Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

`http://www.apache.org/licenses/LICENSE-2.0`

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

This project contains content developed by The MITRE Corporation. If this code is used in a deployment or embedded within another project, it is requested that you send an email to *opensource@mitre.org* in order to let us know where this software is being used.

