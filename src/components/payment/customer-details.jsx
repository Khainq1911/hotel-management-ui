

export default function InforBlock() {
  return (
    <div className="border p-4 shadow rounded-lg h-[200px]">
      <h1 className="text-[28px] font-bold mb-2">Customer details</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-medium">Name</p>
          <p className="text-[#3838CA]">KhaiNguyen</p>
        </div>
        <div>
          <p className="font-medium">Phone Number</p>
          <p className="text-[#3838CA]">0393037180</p>
        </div>
        <div>
          <p className="font-medium">E-mail</p>
          <p className="text-[#3838CA]">khainguyen.public@gmail.com</p>
        </div>
        <div>
          <p className="font-medium">Birthday</p>
          <p className="text-[#3838CA]">19-11-2003</p>
        </div>
      </div>
    </div>
  );
}
