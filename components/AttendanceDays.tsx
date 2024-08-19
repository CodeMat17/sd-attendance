"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import { MinusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DataProps = {
  id: string;
  aug_05: string; //
  aug_08: string;
  aug_12: string;
  aug_15: string;
  aug_19: string;
  aug_22: string;
  aug_26: string;
  aug_29: string;
};

// const FormSchema = z.object({
//   mobile: z.boolean().default(false).optional(),
// });

const AttendanceDays = ({ id }: { id: string }) => {
  const supabase = createClient();
  const [data, setData] = useState<any>([]);
  const [loadingAttendance, setLoadingAttendance] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorLoadingAttendance, setErrorLoadingAttendance] = useState("");

  const attendanceDate = new Date().toISOString();

  useEffect(() => {
    getAttendance();
  }, [id, supabase]);

  const getAttendance = async () => {
    setLoadingAttendance(true);
    setErrorLoadingAttendance("");
    try {
      const { data, error } = await supabase
        .from("sd_attendance")
        .select(
          "id, reg_no, aug_05, aug_08, aug_12, aug_15, aug_19, aug_22, aug_26, aug_29"
        )
        .eq("id", id)
        .single();

      if (error) {
        setErrorLoadingAttendance("Failed to load attendance data");
      }

      if (data) {
        setData(data);       
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingAttendance(false);
    }
  };

  const markAttendance = async () => {
    try {
      setLoading(true);
      setErrorLoadingAttendance("");

      const { data, error } = await supabase
        .from("sd_attendance")
        .update({ aug_19: attendanceDate })
        .eq("id", id)
        .select();

      if (error) {
        setErrorLoadingAttendance(error.message);
      }

      if (data) {
        toast("Attendance marked successfully!");
        getAttendance();
      }
    } catch (error) {
      console.log("ErrorMsg: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {errorLoadingAttendance && (
        <p className='text-sm p-3 text-center my-3 bg-red-500/10 text-red-500 rounded-lg'>
          {errorLoadingAttendance}
        </p>
      )}

      <div className='flex justify-center'>
        {loadingAttendance ? (
          <div className='flex gap-4 my-12'>
            <MinusIcon className='animate-spin' />{" "}
            <p className='text-center'>Reloading attendance data...</p>
          </div>
        ) : (
          <div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              {/* Aug_05 */}
              <div
                className={`flex items-center gap-3 border ${
                  data?.aug_05 ? "border-sky-500 border-2" : ""
                } px-4 py-3 rounded-lg w-full`}>
                <Checkbox disabled checked={data?.aug_05 ? true : false} />
                <div className=''>
                  <p
                    className={`font-medium ${
                      data?.aug_05 ? "text-white" : "text-gray-400"
                    }`}>
                    Aug 05, 2024
                  </p>
                  <p className='text-sm text-gray-400'>
                    {data?.aug_05
                      ? dayjs(data?.aug_05).format("hh:mm a")
                      : "00:00"}
                  </p>
                </div>
              </div>

              {/* Aug_08 */}
              <div
                className={`flex items-center gap-3 border ${
                  data?.aug_08 ? "border-sky-500 border-2" : ""
                } px-4 py-3 rounded-lg w-full`}>
                <Checkbox
                  disabled
                  checked={data?.aug_08 ? true : false}
                  // onCheckedChange={field.onChange}
                  className=''
                />
                <div className=''>
                  <p
                    className={`font-medium ${
                      data?.aug_08 ? "text-white" : "text-gray-400"
                    }`}>
                    Aug 08, 2024
                  </p>
                  <p className='text-sm text-gray-400'>
                    {data?.aug_08
                      ? dayjs(data?.aug_08).format("hh:mm a")
                      : "00:00"}
                  </p>
                </div>
              </div>

              {/* Aug_12 */}
              <div
                className={`flex items-center gap-3 border ${
                  data?.aug_12 ? "border-sky-500 border-2" : ""
                } px-4 py-3 rounded-lg w-full`}>
                <Checkbox
                  disabled
                  checked={data?.aug_12 ? true : false}
                  // onCheckedChange={field.onChange}
                  className=''
                />
                <div className=''>
                  <p
                    className={`font-medium ${
                      data?.aug_12 ? "text-white" : "text-gray-400"
                    }`}>
                    Aug 12, 2024
                  </p>
                  <p className='text-sm text-gray-400'>
                    {data?.aug_12
                      ? dayjs(data?.aug_12).format("hh:mm a")
                      : "00:00"}
                  </p>
                </div>
              </div>

              {/* Aug_15 */}
              <div
                className={`flex items-center gap-3 border ${
                  data?.aug_15 ? "border-sky-500 border-2" : ""
                } px-4 py-3 rounded-lg w-full`}>
                <Checkbox
                  disabled
                  checked={data?.aug_15 ? true : false}
                  // onCheckedChange={field.onChange}
                  className=''
                />
                <div className=''>
                  <p
                    className={`font-medium ${
                      data?.aug_15 ? "text-white" : "text-gray-400"
                    }`}>
                    Aug 15, 2024
                  </p>
                  <p className='text-sm text-gray-400'>
                    {data?.aug_15
                      ? dayjs(data?.aug_15).format("hh:mm a")
                      : "00:00"}
                  </p>
                </div>
              </div>

              {/* Aug_19 */}
              <div
                className={`flex items-center gap-3 border ${
                  data?.aug_19 ? "border-sky-500 border-2" : ""
                } px-4 py-3 rounded-lg w-full`}>
                <Checkbox
                  disabled
                  checked={data?.aug_19 ? true : false}
                  // onCheckedChange={field.onChange}
                  className=''
                />
                <div className=''>
                  <p
                    className={`font-medium ${
                      data?.aug_19 ? "text-white" : "text-gray-400"
                    }`}>
                    Aug 19, 2024
                  </p>
                  <p className='text-sm text-gray-400'>
                    {data?.aug_19
                      ? dayjs(data?.aug_19).format("hh:mm a")
                      : "00:00"}
                  </p>
                </div>
              </div>

              {/* Aug_22 */}
              <div
                className={`flex items-center gap-3 border ${
                  data?.aug_22 ? "border-sky-500 border-2" : ""
                } px-4 py-3 rounded-lg w-full`}>
                <Checkbox
                  disabled
                  checked={data?.aug_22 ? true : false}
                  // onCheckedChange={field.onChange}
                  className=''
                />
                <div className=''>
                  <p
                    className={`font-medium ${
                      data?.aug_22 ? "text-white" : "text-gray-400"
                    }`}>
                    Aug 22, 2024
                  </p>
                  <p className='text-sm text-gray-400'>
                    {data?.aug_22
                      ? dayjs(data?.aug_22).format("hh:mm a")
                      : "00:00"}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 border ${
                  data?.aug_26 ? "border-sky-500 border-2" : ""
                } px-4 py-3 rounded-lg w-full`}>
                <Checkbox
                  disabled
                  checked={data?.aug_26 ? true : false}
                  // onCheckedChange={field.onChange}
                  className=''
                />
                <div className=''>
                  <p
                    className={`font-medium ${
                      data?.aug_26 ? "text-white" : "text-gray-400"
                    }`}>
                    Aug 26, 2024
                  </p>
                  <p className='text-sm text-gray-400'>
                    {data?.aug_26
                      ? dayjs(data?.aug_26).format("hh:mm a")
                      : "00:00"}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 border ${
                  data?.aug_29 ? "border-sky-500 border-2" : ""
                } px-4 py-3 rounded-lg w-full`}>
                <Checkbox
                  disabled
                  checked={data?.aug_29 ? true : false}
                  // onCheckedChange={field.onChange}
                  className=''
                />
                <div className=''>
                  <p
                    className={`font-medium ${
                      data?.aug_29 ? "text-white" : "text-gray-400"
                    }`}>
                    Aug 29, 2024
                  </p>
                  <p className='text-sm text-gray-400'>
                    {data?.aug_29
                      ? dayjs(data?.aug_29).format("hh:mm a")
                      : "00:00"}
                  </p>
                </div>
              </div>
              </div>
              
            <div className='mt-8 flex flex-col justify-center items-center'>
              <Button
                onClick={markAttendance}
                disabled={loading}
                className='bg-sky-500 hover:bg-sky-700 text-white'>
                {loading ? (
                  <MinusIcon className='animate-spin' />
                ) : (
                  "I Am Present"
                )}
              </Button>
              <p className='text-sm text-gray-400 mt-1'>
                {dayjs(attendanceDate).format("MMM DD, YYYY")}
              </p>
              </div>
              
          </div>
        )}
      </div>
    </>
  );
};

export default AttendanceDays;
