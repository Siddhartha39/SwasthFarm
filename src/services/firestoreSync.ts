import { db, auth } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';
import { 
  Farm, 
  Animal, 
  ProductionRecord, 
  FeedRecord, 
  HealthRecord, 
  VaccinationRecord, 
  TreatmentRecord, 
  AlertItem 
} from '@/types';

/**
 * Firebase Firestore Sync Service for Livestock X
 * Synchronizes local state to Firestore collections when Firebase is initialized.
 */
export class FirestoreSyncService {
  private static isConnected(): boolean {
    return !!db;
  }

  // --- Farms ---
  static async syncFarm(farm: Farm) {
    if (!this.isConnected() || !db) return;
    try {
      const ref = doc(db, 'farms', farm.id);
      await setDoc(ref, { ...farm, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (e) {
      console.warn(`[FirestoreSync] Failed to sync farm ${farm.id}:`, e);
    }
  }

  static async deleteFarm(farmId: string) {
    if (!this.isConnected() || !db) return;
    try {
      await deleteDoc(doc(db, 'farms', farmId));
    } catch (e) {
      console.warn(`[FirestoreSync] Failed to delete farm ${farmId}:`, e);
    }
  }

  // --- Animals ---
  static async syncAnimal(animal: Animal) {
    if (!this.isConnected() || !db) return;
    try {
      const ref = doc(db, 'farms', animal.farmId, 'animals', animal.id);
      await setDoc(ref, { ...animal, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (e) {
      console.warn(`[FirestoreSync] Failed to sync animal ${animal.id}:`, e);
    }
  }

  static async deleteAnimal(farmId: string, animalId: string) {
    if (!this.isConnected() || !db) return;
    try {
      await deleteDoc(doc(db, 'farms', farmId, 'animals', animalId));
    } catch (e) {
      console.warn(`[FirestoreSync] Failed to delete animal ${animalId}:`, e);
    }
  }

  // --- Production Records ---
  static async syncProduction(record: ProductionRecord) {
    if (!this.isConnected() || !db) return;
    try {
      const ref = doc(db, 'farms', record.farmId, 'production', record.id);
      await setDoc(ref, { ...record, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (e) {
      console.warn(`[FirestoreSync] Failed to sync production ${record.id}:`, e);
    }
  }

  // --- Feed Records ---
  static async syncFeed(record: FeedRecord) {
    if (!this.isConnected() || !db) return;
    try {
      const ref = doc(db, 'farms', record.farmId, 'feed', record.id);
      await setDoc(ref, { ...record, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (e) {
      console.warn(`[FirestoreSync] Failed to sync feed ${record.id}:`, e);
    }
  }

  // --- Health Records ---
  static async syncHealth(record: HealthRecord) {
    if (!this.isConnected() || !db) return;
    try {
      const ref = doc(db, 'farms', record.farmId, 'health', record.id);
      await setDoc(ref, { ...record, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (e) {
      console.warn(`[FirestoreSync] Failed to sync health ${record.id}:`, e);
    }
  }

  // --- Vaccination Records ---
  static async syncVaccination(record: VaccinationRecord) {
    if (!this.isConnected() || !db) return;
    try {
      const ref = doc(db, 'farms', record.farmId, 'vaccinations', record.id);
      await setDoc(ref, { ...record, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (e) {
      console.warn(`[FirestoreSync] Failed to sync vaccination ${record.id}:`, e);
    }
  }

  // --- Batch Seed Initial Data to Firestore (When online) ---
  static async seedInitialDataIfEmpty(
    farms: Farm[],
    animals: Animal[],
    production: ProductionRecord[],
    feed: FeedRecord[],
    health: HealthRecord[],
    vaccines: VaccinationRecord[]
  ) {
    if (!this.isConnected() || !db) return;
    try {
      const farmsSnap = await getDocs(collection(db, 'farms'));
      if (farmsSnap.empty) {
        console.log('[FirestoreSync] First-time cloud sync: Initializing Firestore with farm telemetry...');
        for (const farm of farms) {
          await this.syncFarm(farm);
        }
        for (const animal of animals) {
          await this.syncAnimal(animal);
        }
        for (const prod of production) {
          await this.syncProduction(prod);
        }
        for (const f of feed) {
          await this.syncFeed(f);
        }
        for (const h of health) {
          await this.syncHealth(h);
        }
        for (const v of vaccines) {
          await this.syncVaccination(v);
        }
        console.log('[FirestoreSync] Cloud initialization complete.');
      }
    } catch (e) {
      console.warn('[FirestoreSync] Offline mode / unable to seed cloud collections:', e);
    }
  }
}
