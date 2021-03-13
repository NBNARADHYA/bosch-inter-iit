import errno
import os
import os.path
import shutil


def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as exc:
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else:
            raise


def delete_files(folder, split_string=None, low=None):
    for filename in os.listdir(folder):
        if split_string is not None and low is not None:
            step = int(filename.split(split_string)[1].split(".")[0])

            if step <= low:
                continue

        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print("Failed to delete %s. Reason: %s" % (file_path, e))


def get_file_names(folder):
    return os.listdir(folder)
