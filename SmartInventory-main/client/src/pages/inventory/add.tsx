import { InventoryForm } from "@/components/inventory/InventoryForm";

export default function AddInventoryItem() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-medium text-neutral-800 mb-4">Add Inventory Item</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <InventoryForm />
      </div>
    </div>
  );
}
