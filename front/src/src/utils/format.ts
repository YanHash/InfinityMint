export function formatAddress(address: string, length: number = 6): string {
    if (!address || address.length < 10) return address; // Vérification de base
    return `${address.slice(0, length)}...${address.slice(-length)}`;
}
