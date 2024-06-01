/* eslint-disable react/prop-types */

import { useQuery } from "@apollo/client";
import { query as GET_STUDENT } from "@/Apollo/queries";
import { TableRow, TableCell } from "@/components/ui/table";
import Loader from "../Loader/Loader";

const StudentStatsRow = ({ student }) => {
  const { loading, error, data} = useQuery(GET_STUDENT, {
    variables: { username: student.studentUsername },
  });

  if (loading) return <Loader />;
  if (error) return <TableRow>Error: {error.message}</TableRow>;

  return (
    <TableRow className="text-center text-xs sm:text-base">
      <TableCell>{student.studentName}</TableCell>
      <TableCell className="underline-offset-2 underline">
        <a
          href={`https://www.leetcode.com/u/${student.studentUsername}`}
          target="_blank"
          rel="noreferrer"
        >
          {student.studentUsername}
        </a>
      </TableCell>
      <TableCell>
        {data.getStudent.easy + data.getStudent.medium + data.getStudent.hard}
      </TableCell>
      <TableCell className="text-green-500">{data.getStudent.easy}</TableCell>
      <TableCell className="text-yellow-500">
        {data.getStudent.medium}
      </TableCell>
      <TableCell className="text-red-500">{data.getStudent.hard}</TableCell>
    </TableRow>
  );
};

export default StudentStatsRow;
