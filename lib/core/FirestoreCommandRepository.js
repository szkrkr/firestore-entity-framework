var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import EntityState from "./EntityState";
export default class FirestoreCommandRepository {
    constructor(reference) {
        /**
         * @description
         * save all changes in this data set
         */
        this.saveChanges = (entries) => __awaiter(this, void 0, void 0, function* () {
            if (!this.reference) {
                throw new ReferenceError('reference is not decided. ');
            }
            const batch = this.reference.firestore.batch();
            for (var i = 0; i < entries.length; i++) {
                switch (entries[i].state) {
                    case EntityState.Unchanged:
                        break;
                    case EntityState.Added:
                    case EntityState.Mofified:
                        batch.set(this.reference.doc(entries[i].id), Object.assign({}, entries[i].entity));
                        break;
                    case EntityState.Deleted:
                        batch.delete(this.reference.doc(entries[i].id));
                        break;
                }
            }
            return yield batch.commit().catch((err) => { return Promise.reject(new Error(err)); });
        });
        /**
         * @description
         * save change of a entry
         */
        this.saveChange = (entry) => __awaiter(this, void 0, void 0, function* () {
            if (entry.state === EntityState.Unchanged) {
                return;
            }
            if (entry.state === EntityState.Deleted) {
                return;
            }
            return yield this.reference.doc(entry.id).set(Object.assign({}, entry.entity));
        });
        this.reference = reference;
    }
}
