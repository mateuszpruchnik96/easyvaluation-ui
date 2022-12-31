export default class ProjectClass {
  id;
  version;
  name;
  description;
  openingProjectTime;
  itemsJSON;
  items = {};
  operationList = [];

  constructor(
    id,
    version,
    name,
    description,
    openingProjectTime,
    itemsJSON,
    items,
    operationList
  ) {
    this.id = id;
    this.version = version;
    this.name = name;
    this.description = description;
    this.openingProjectTime = openingProjectTime;
    this.itemsJSON = itemsJSON;
    this.items = items;
    this.operationList = operationList;
  }
}
