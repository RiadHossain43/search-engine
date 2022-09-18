/**
 * Caution: there is huge security risk when changing the algaorithom, so
 * please don't try to bring performance inprovements or enhancements
 * unless you exactly know what you are doing.
 * All Funtionality requirements will be listed further.
 * Very Confidentioal piece of code to accesses.
 */
class Filters {
  constructor(data, options = { searchFields: [] }) {
    this.qry = data;
    this.queryStr = JSON.stringify(data);
    this.searchFields = options.searchFields;
  }
  dotNotate(obj, target, prefix) {
    target = target || {};
    prefix = prefix || "";
    Object.keys(obj).forEach((key) => {
      if (key[0] === "$" && prefix) {
        return (target[prefix.slice(0, prefix.length - 1)] = obj);
      }
      if (typeof obj[key] === "object" && obj[key] !== null) {
        this.dotNotate(obj[key], target, prefix + key + ".");
      } else {
        return (target[prefix + key] = obj[key]);
      }
    });
    this.qry = { ...target };
    this.queryStr = JSON.stringify(target);
    return this;
  }
  formatOperators() {
    let currentString = JSON.stringify(this.qry);
    this.queryStr = currentString.replace(
      /\b(or|gt|gte|lt|options|lte|in|nin|ne|equals|all|regex)\b/g,
      (key) => `$${key}`
    );
    return this;
  }
  removeOptions() {
    let removeItems = [
      "page",
      "size",
      "sort",
      "tenant",
      "threshold",
      "createdBy",
      "userId",
      "roleName",
    ];
    removeItems.forEach((item) => delete this.qry[item]);
    return this;
  }
  trim() {
    this.removeOptions();
    return this;
  }
  search() {
    if (!this.qry.clientSearch || !this.searchFields.length) {
      delete this.qry["clientSearch"];
      this.queryStr = JSON.stringify(this.qry);
      return this;
    }
    let search = new RegExp(
      this.qry.clientSearch && this.qry.clientSearch,
      "i"
    );
    let searchQuery = this.qry.$or || [];
    this.qry.$or = [
      ...searchQuery,
      ...this.searchFields.map((field) => {
        return {
          [field]: {
            $regex: this.qry.clientSearch && this.qry.clientSearch,
            $options: "i",
          },
        };
      }),
    ];
    delete this.qry["clientSearch"];
    this.queryStr = JSON.stringify(this.qry);
    return this;
  }
  build() {
    /**
     * Sequence of function call matters here, if correct sequence is not maintained
     * search feature along with some other will break.
     */
    this.trim();
    this.formatOperators();
    this.dotNotate(JSON.parse(this.queryStr));
    this.search();
    return this;
  }
  queryString() {
    return this.queryStr;
  }
  query() {
    console.log("Current filter:", JSON.parse(this.queryStr));
    return JSON.parse(this.queryStr);
  }
}
exports.Filters = Filters;
