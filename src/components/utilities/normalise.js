import { normalize, schema } from "normalizr";

//Schema Defined
const sponsorRequests = new schema.Entity(
  "sponsorRequests",
  {},
  { idAttribute: "_id" }
);

const volunteerRequests = new schema.Entity(
  "volunteerRequests",
  {},
  { idAttribute: "_id" }
);
const volunteeringInfo = new schema.Entity(
  "volunteeringInfo",
  {
    volunteerRequests: [volunteerRequests],
  },
  { idAttribute: "_id" }
);

const supplies = new schema.Entity("supplies", {}, { idAttribute: "_id" });
const updates = new schema.Entity("updates", {}, { idAttribute: "_id" });

const projects = new schema.Entity(
  "projects",
  {
    sponsorRequests: [sponsorRequests],
    supplies: [supplies],
    updates: [updates],
    volunteeringInfo: volunteeringInfo,
  },
  { idAttribute: "_id" }
);

const organisations = new schema.Entity(
  "createdOrganisations",
  {
    projects: [projects],
    sponsorRequests: [sponsorRequests],
  },
  { idAttribute: "_id" }
);

const groups = new schema.Entity("createdGroups", {}, { idAttribute: "_id" });

const user = new schema.Entity(
  "user",
  {
    createdOrganisations: [organisations],
    createdGroups: [groups],
    sponsorRequests: [sponsorRequests],
  },
  { idAttribute: "_id" }
);

export const normalizeUserState = (data) => {
  const normalizedData = normalize(data, user);
  normalizedData.entities.userID = normalizedData.result;
  //Creating allIds array for each entity
  normalizedData.entityIds = {
    createdOrganisations: [],
    projects: [],
    createdGroups: [],
    sponsorRequests: [],
    volunteeringInfo: [],
    volunteerRequests: [],
    userVolunteerRequests: [],
    updates: [],
    supplies: [],
  };

  //HACK to get user.volunteer.volunteering into a seperate volunteer requests dict... yes im lazy.
  normalizedData.userVolunteerRequests = {};
  normalizedData.entities.userVolunteerRequests = {};
  data.volunteer.volunteering.map((v) => {
    normalizedData.entityIds.userVolunteerRequests.push(v._id);
    normalizedData.entities.userVolunteerRequests[v._id] = v;
  });

  for (const [key] of Object.entries(normalizedData.entities.projects)) {
    normalizedData.entityIds.projects.push(key);
  }
  for (const [key] of Object.entries(
    normalizedData.entities.createdOrganisations
  )) {
    normalizedData.entityIds.createdOrganisations.push(key);
  }
  for (const [key] of Object.entries(normalizedData.entities.projects)) {
    normalizedData.entityIds.projects.push(key);
  }
  for (const [key] of Object.entries(normalizedData.entities.createdGroups)) {
    normalizedData.entityIds.createdGroups.push(key);
  }
  for (const [key] of Object.entries(normalizedData.entities.sponsorRequests)) {
    normalizedData.entityIds.sponsorRequests.push(key);
  }
  for (const [key] of Object.entries(
    normalizedData.entities.volunteeringInfo
  )) {
    normalizedData.entityIds.volunteeringInfo.push(key);
  }
  for (const [key] of Object.entries(
    normalizedData.entities.volunteerRequests
  )) {
    normalizedData.entityIds.volunteerRequests.push(key);
  }
  for (const [key] of Object.entries(normalizedData.entities.updates)) {
    normalizedData.entityIds.updates.push(key);
  }
  for (const [key] of Object.entries(normalizedData.entities.supplies)) {
    normalizedData.entityIds.supplies.push(key);
  }
  return normalizedData;
};
