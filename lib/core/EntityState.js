var EntityState;
(function (EntityState) {
    EntityState[EntityState["Unchanged"] = 0] = "Unchanged";
    EntityState[EntityState["Mofified"] = 1] = "Mofified";
    EntityState[EntityState["Added"] = 2] = "Added";
    EntityState[EntityState["Deleted"] = 3] = "Deleted";
})(EntityState || (EntityState = {}));
export default EntityState;
