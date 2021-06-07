import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import ActionInput from '../../../components/institutionOfEducationAdmin/actionInput';
import Moderator from '../../../components/institutionOfEducationAdmin/moderator';
import { requestSecureData } from '../../../services/requestDataFunction';
import styles from './moderators.module.scss';
import { Form, Formik } from 'formik';
import { useAuth } from '../../../services/tokenValidator';
import { APIUrl } from '../../../services/endpoints';
import Spinner from '../../../components/common/spinner/index';
import { FormInputSuccess } from '../../../components/common/formElements/formInputSuccess/formInputSuccess';

interface Moderator {
  moderatorId: number;
  email: string;
  isBanned: boolean;
}

function Moderators() {
  const [moderatorsList, setModeratorsList] = useState<Array<Moderator>>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [justAdded, setJustAdded] = useState<undefined | string>();
  const [error, setError] = useState(false);
  const { getToken } = useAuth();

  const renderModerators = async () => {
    const currentToken = await getToken();
    requestSecureData<Array<Moderator>>(
      `${APIUrl}InstitutionOfEducationAdmin/GetIoEModerators`,
      'GET',
      currentToken
    )
      .then(({ statusCode, data }) => {
        if (statusCode.toString().match(/^[23]\d{2}$/)) {
          setModeratorsList(data);
        } else {
          setError(true);
        }
        setIsFetching(false);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    renderModerators();
  }, []);

  const handleModeratorBlocking = (id: number) => {
    const updated = moderatorsList.map((moderator) => {
      if (id === moderator.moderatorId) {
        moderator.isBanned = !moderator.isBanned;
      }
      return moderator;
    });
    setModeratorsList(updated);
  };

  const handleModeratorDeleting = (id: number) => {
    const updated = moderatorsList.filter((moderator) => {
      return moderator.moderatorId !== id;
    });
    setModeratorsList(updated);
  };

  let content;
  if (isFetching && !error) {
    content = (
      <div className={styles.loadingScreen}>
        <Spinner />
      </div>
    );
  } else if (!isFetching && error) {
    content = (
      <div className={styles.errorScreen}>
        <h2>Щось пішло не так, спробуйте знову.</h2>
      </div>
    );
  } else {
    content = (
      <main className={styles.moderators}>
        <div className={styles.container}>
          <h1 className={styles.title}>Модератори</h1>
          <h2 className={styles.subtitle}>
            Щоб додати модератора, введіть електрону пошту особи, яку бажаєте
            призначити модератором і ми відправимо на неї лист для реєстрації
          </h2>
          <div className={styles.emailInput}>
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={yup.object({
                email: yup
                  .string()
                  .email('Введіть дійсну електронну пошту')
                  .max(
                    70,
                    'Занадто велика кількість символів,перевірте правильність введення електронної пошти'
                  ),
              })}
              onSubmit={(values, actions) => {
                (async function () {
                  const currentToken = await getToken();
                  requestSecureData(
                    `${APIUrl}InstitutionOfEducationAdmin/AddIoEModerator`,
                    'POST',
                    currentToken,
                    {
                      userEmail: values.email,
                    }
                  )
                    .then(({ statusCode, data }: any) => {
                      if (statusCode.toString().match(/^[23]\d{2}$/)) {
                        renderModerators();
                        setJustAdded(data.message);
                        actions.resetForm();
                        actions.setSubmitting(false);
                        setTimeout(() => {
                          setJustAdded(undefined);
                        }, 1500);
                      } else {
                        actions.setErrors({ email: data.message });
                        actions.setSubmitting(false);
                      }
                    })
                    .catch((e) => {
                      console.log(e);
                      setError(true);
                    });
                })();
              }}
            >
              <Form className={styles.addModeratorForm}>
                <ActionInput message={justAdded} name='email' />
                <div className={styles.success}>
                  {justAdded ? (
                    <FormInputSuccess successMessage={justAdded} />
                  ) : (
                    ''
                  )}
                </div>
              </Form>
            </Formik>
          </div>

          <div className={styles.moderatorList}>
            {moderatorsList.length === 0 ? (
              <h2 className={styles.emptyListMessage}>
                Немає обраних модераторів
              </h2>
            ) : (
              moderatorsList.map((moderator) => {
                const { moderatorId, email, isBanned } = moderator;
                return (
                  <Moderator
                    key={moderatorId}
                    email={email}
                    deleteHandler={() => {
                      handleModeratorDeleting(moderatorId);
                    }}
                    blockHandler={() => {
                      handleModeratorBlocking(moderatorId);
                    }}
                    isBlocked={isBanned}
                  />
                );
              })
            )}
          </div>
        </div>
      </main>
    );
  }
  return content;
}

export default Moderators;
