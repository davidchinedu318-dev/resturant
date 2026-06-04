export default function SearchBar({searchTerm, setSearchTerm}) {
    return (
        <div className="flex justify-center mb-8">
            <input type="text" placeholder="Search for a dish.."
             value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500"/>

    
        </div>
    )
}