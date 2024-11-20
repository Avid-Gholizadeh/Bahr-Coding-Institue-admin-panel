import { useState } from 'react';
import { Card, CardTitle, CardBody, Table, Input, Button } from 'reactstrap';
import { addRole } from '../../../@core/services/api/User';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

// Helper function to chunk an array into smaller arrays
const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

const useAddRoleMutation = () => {
  return useMutation({
    mutationFn: ({ roleId, userId }) => addRole(roleId, userId),
    onSuccess: () => {
      toast.success('نقش‌ها با موفقیت به‌روزرسانی شدند');
    },
    onError: () => {
      toast.error('خطا در به‌روزرسانی نقش‌ها');
    },
  });
};

const GiveRole = ({ user }) => {
  const addRoleMutation = useAddRoleMutation();

  // Define roles
  const roles = [
    { label: 'ادمین', id: 1, key: 'Administrator' },
    { label: 'استاد', id: 2, key: 'Teacher' },
    { label:'ادمین کارمند', id:3 , key: 'Employee.Admin'},
    { label:  ' نویسنده کارمند', id: 4, key: 'Employee.Writer' },
    { label: 'دانشجو', id: 5, key: 'Student' },
    { label: 'کمک دوره', id: 6, key: 'CourseAssistance' },
    { label: 'ادمین مسابقه', id: 7, key: 'TournamentAdmin' },
    { label: 'منتور', id: 8, key: 'TournamentMentor' },
    { label: 'داور', id: 9, key: 'Referee' },
    { label: 'پشتیبان', id: 10, key: 'Support' },
  ];

  const [checkedRoles, setCheckedRoles] = useState(() =>
    roles.reduce((acc, role) => {
      acc[role.key] = user.roles.some(userRole => userRole.roleName === role.key);
      return acc;
    }, {})
  );

  const [pendingChanges, setPendingChanges] = useState(checkedRoles);

  const handleCheckboxChange = (roleKey, isChecked) => {
    setPendingChanges(prev => ({ ...prev, [roleKey]: isChecked }));
  };

  const saveChanges = () => {
    Object.entries(pendingChanges).forEach(([roleKey, isChecked]) => {
      const role = roles.find(r => r.key === roleKey);
      if (role && checkedRoles[roleKey] !== isChecked) {
        addRoleMutation.mutate({ roleId: role.id, userId: user.id });
      }
    });
    setCheckedRoles(pendingChanges);
  };

  // Split roles into chunks of 5
  const roleChunks = chunkArray(roles, 5);

  return (
    <Card>
      <CardBody>
        <CardTitle className="mb-50" tag="h4">
          نقش
        </CardTitle>
        <p> نقشی را انتخاب و سپس تایید کنید </p>
      </CardBody>
      <Table className="text-nowrap text-center border-bottom" responsive>
      {roleChunks.map((chunk, index) => (
          <tbody key={`chunk-${index}`}>
            {/* Header Row */}
            <tr>
              {chunk.map(role => (
                <th key={role.id}>{role.label}</th>
              ))}
            </tr>
            {/* Checkbox Row */}
            <tr>
              {chunk.map(role => (
                <td key={role.id}>
                  <div className="d-flex form-check justify-content-center">
                    <Input
                      type="checkbox"
                      checked={pendingChanges[role.key]}
                      onChange={(e) => handleCheckboxChange(role.key, e.target.checked)}
                    />
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        ))}
      </Table>
      <CardBody className="m-auto">
        <Button color="primary" onClick={saveChanges}>
          ذخیره تغییرات
        </Button>
      </CardBody>
    </Card>
  );
};

export default GiveRole;
